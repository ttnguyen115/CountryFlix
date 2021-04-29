
import Layout from "../components/layout/Layout";
import CountriesTable from "../components/countriesTable/CountriesTable";
import SearchInput from "../components/searchInput/SearchInput";
import styles from '../styles/Home.module.css';
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(keyword) ||
    country.capital.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword) 
  );

  const handleInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}> 
          Found {countries.length} countries 
        </div>

        <div className={styles.input }>
          <SearchInput 
            placeholder="Filter by Name, Capital, Region..."
            onChange={handleInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}


export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json(); 

  return {
    props: {
      countries,
    }
  }
}