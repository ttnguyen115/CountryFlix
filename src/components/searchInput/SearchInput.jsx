import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({...rest}) => {
    return (
        <div className={styles.wrapper}>
            <SearchRoundedIcon color="inherit" />
            <input 
                {... rest} 
                className={styles.input} 
            />
        </div>
    )
}

export default SearchInput;