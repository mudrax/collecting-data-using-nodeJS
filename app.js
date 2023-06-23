import fetch from 'node-fetch';
import {JSDOM} from 'jsdom';

const URL = "https://upmines.upsdc.gov.in//licensee/PrintLicenseeFormVehicleCheckValidOrNot.aspx?eId=31122223990233011";

const matching_websites = [];

async function getHTMLContent(url){
    const response = await fetch(url);
    const htmlContent = await response.text();
    return htmlContent;
}

const district = "MEERUT";

for(var i=0 ; i<=99 ; i++){
    
    var ans = i.toString();
    
    while(ans.length<2){
        ans = "0"+ans;
    }
    

    var url = URL+ans;
    
    try{
        const htmlContent = await getHTMLContent(url);
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        const currDistrict = document.getElementById("lbl_destination_district").textContent;

        // console.log(currDistrict);

        if(district == currDistrict){
            matching_websites.push(url);
        }

    } catch(e){
        console.error(`Error fetching or parsing HTML for ${url}:`, e);
    }
}


for(var i=0 ; i<matching_websites.length ; i++){
    console.log(matching_websites[i]);
}
