import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [typeOfCases, settypeOfCases] = useState([
    "Total Cases",
    "New Cases",
    "Deaths",
    "New Deaths",
    "Recovered",
    "New Recovered",
    "Active",
    "Critical",
    "Tests",
    "Population",
    "TestsPOM",
    "DeathsPOM",
    "CasesPOM",
  ]);
  const [temp, setTemp] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === `worldwide`
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  const onCaseChange = async (e) => {
    const selectedCase = e.target.value;
    switch (selectedCase) {
      case "New Cases":
        setTemp("todayCases");
        break;
      case "Deaths":
        setTemp("deaths");
        break;
      case "New Deaths":
        setTemp("todayDeaths");
        break;
      case "Recovered":
        setTemp("recovered");
        break;
      case "New Recovered":
        setTemp("todayRecovered");
        break;
      case "Active":
        setTemp("active");
        break;
      case "Critical":
        setTemp("critical");
        break;
      case "Tests":
        setTemp("tests");
        break;
      case "Papulation":
        setTemp("papulation");
        break;
      case "TestsPOM":
        setTemp("testsPerOneMillion");
        break;
      case "DeathsPOM":
        setTemp("deathsPerOneMillion");
        break;
      case "CasesPOM":
        setTemp("casesPerOneMillion");
        break;
      default:
        setTemp("cases");
        break;
    }
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              onChange={onCountryChange}
              value={country}
              variant="outlined"
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            isLightRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          <div className="app_tableHeader">
            <h3>Live Cases by Country</h3>
            <FormControl className="table_dropdown">
              <Select variant="outlined" value={temp} onChange={onCaseChange}>
                <MenuItem value="Total Cases">Total Cases</MenuItem>
                {typeOfCases.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Table countries={tableData} selectedCase={temp} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
