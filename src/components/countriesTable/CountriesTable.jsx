import styles from './CountriesTable.module.css';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import { useState } from 'react';
import Link from 'next/Link';

const handleOrderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
    }

    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
    }

    return countries;
}

const SortArrow = ({direction}) => {
    if (!direction) return <></>;

    if (direction === 'desc') {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRoundedIcon color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRoundedIcon color="inherit" />
            </div>
        );
    }
}

const CountriesTable = ({countries}) => { 
    const [direction, setDirection] = useState();
    const [value, setValue] = useState("");

    const orderedCountries = handleOrderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection('desc');
        } else if (direction === 'desc') {
            setDirection('asc');
        } else {
            setDirection(null);
        }
    }

    const setValueAndDirection = (value) => {
        setValue(value);
        switchDirection();
    }

    return (
        <div>
            <div className={styles.heading}>
                <button 
                    className={styles.heading_name}
                    onClick={() => setValueAndDirection("name")}
                >
                    <div>Name</div>

                    <SortArrow direction={direction}  />
                </button>

                <button 
                    className={styles.heading_capital}
                    onClick={() => setValueAndDirection("capital")}
                >
                    <div>Capital</div>

                    {value === "capital" && <SortArrow direction={direction} />}
                </button>

                <button 
                    className={styles.heading_area}
                    onClick={() => setValueAndDirection("area")}
                >
                    <div>Area (km<sub>2</sub>)</div>

                    {value === "area" && <SortArrow direction={direction} />}
                </button>

                
                <div className={styles.heading_flag}>Flag</div>
            </div>

            {orderedCountries.map(country => (
                <Link href={`/country/${country.alpha3Code}`}  key={country.alpha2Code}>
                    <div className={styles.row}>
                        <div className={styles.name}>
                            {country.name}
                        </div>

                        <div className={styles.capital}>
                            {country.capital || "\"Unknown\""} 
                        </div>

                        <div className={styles.area}>
                            {country.area || 0} 
                        </div>

                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name}/>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CountriesTable;