import React,{useState, useEffect} from "react";

import {Header as HeaderOne} from "./One/Header";
import {Header as HeaderTwo} from "./Two/Header";
import {HeroSection as HeroSectionOne} from "./One/HeroSection";
import {MainSection as HeroSectionTwo} from "./Two/MainSection";
import { Footer as FooterOne } from "./One/Footer";
import { Footer as FooterTwo } from "./Two/Footer";

export const Template = () => {
    // const [data, setData] = useState({});
    const [header, setHeader] = useState('');
    const [hero,setHero]=useState('');
    const [footer, setFooter] = useState('');

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch('/api');
          const jsonData = await response.json();
          setHeader(jsonData.header);
          setHero(jsonData.hero);
          setFooter(jsonData.footer);
          console.log('Data: ', jsonData);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      getData();
    }, []);
      // Define the template mapping object
  const templateMapping = {
    'HeaderOne': HeaderOne,
    'HeaderTwo': HeaderTwo,
    'HeroSectionOne':HeroSectionOne,
    'HeroSectionTwo':HeroSectionTwo,
    'FooterOne':FooterOne,
    'FooterTwo':FooterTwo
    // Add more templates as needed
  };

  // Use the template name to get the corresponding component
  const HeaderComponent = templateMapping[header];
  const HeroComponent = templateMapping[hero];
  const FooterComponent = templateMapping[footer];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
    <div>{HeaderComponent && <HeaderComponent />}</div>
    <div>{HeroComponent && <HeroComponent />}</div>
    <div>{FooterComponent && <FooterComponent />}</div>
  </div>
  )
}
