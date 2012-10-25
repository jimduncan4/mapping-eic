 (function(){
  var iconhost = "http://jimduncan4.github.com/mapping-eic/images/icons/worldbank/";
  F1.WorldBank.extractives = {
  
  "Licenses": {
   infoWindowFilter:{"title": "$[soumnameen] Soum","subtitle": "","tabs": [{"title": "<b>Production</b>","type": "text","value": "Number of production licenses: $[prod_count]\nArea under production license: $[prod_area] hectares\nSoum area: $[soum_area] hectares\nPercent of soum: $[prod_pct]"},{"title": "<b>Exploration</b>","type": "text","value": "Number of exploration licenses: $[exp_count]\nArea under exploration license: $[exp_area] hectares\nSoum area: $[soum_area] hectares\nPercent of soum: $[exp_pct]"},{"title": "<b>All</b>","type": "text","value": "Total number of licenses: $[all_count]\nArea under any license: $[all_area] hectares\nSoum area: $[soum_area] hectares\nPercent of soum: $[all_pct]"},{"title": "<b>About</b>","type": "text","value": "This data is derived from spatial data on licenses provided by the Mineral Resources Authority of Mongolia and boundary data from the Environmental Information Center. See the About page for more details."}]},
  "Production percent": {"infoWindowFilter": {"subtitle": "Percent of soum under production license: $[prod_pct]%"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "prod_pct","categories": 5, "color": [0xFEF7A5]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xFEF7A5]},"fill": {"opacity": 0.75,"color": [0xFEF7A5]}, "expression":"$[prod_pct] > 0"},
  "Production count": {"infoWindowFilter": {"subtitle": "Number of production licenses in soum: $[prod_count]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "prod_count","categories": 5,"color": [0xFCAE91]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xFCAE91]},"fill": {"opacity": 0.75,"color": [0xFCAE91]}, "expression":"$[prod_count] > 0"},
  "Exploration percent": {"infoWindowFilter": {"subtitle": "Percent of soum under exploration license: $[exp_pct]%"}, "icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 0.75,"dropShadow": true,"selectedAttribute": "exp_pct","categories": 5,"color": [0xFECE6D]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xFECE6D]},"fill": {"opacity": 0.75,"color": [0xFECE6D]}, "expression":"$[exp_pct] > 0"},  
  "Exploration count": {"infoWindowFilter": {"subtitle": "Number of exploration licenses in soum: $[exp_count]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 0.75,"dropShadow": true,"selectedAttribute": "exp_count","categories": 5,"color": [0xFB6A4A]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xFB6A4A]},"fill": {"opacity": 0.75,"color": [0xFB6A4A]},"expression":"$[exp_count] > 0"},
  "All percent": {"infoWindowFilter": {"subtitle": "Percent of soum under any license: $[all_pct]%"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "all_pct","categories": 5, "color": [0xEC8414]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xEC8414]},"fill": {"opacity": 0.75,"color": [0xEC8414]},"expression":"$[all_pct] > 0"},
  "All count": {"infoWindowFilter": {"subtitle": "Number of licenses (all) in soum: $[all_count]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "all_count","categories": 5,"color": [0xCB181D]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": [0xCB181D]},"fill": {"opacity": 0.75,"color": [0xCB181D]},"expression":"$[all_count] > 0"}
  },
  
  "EITI": {
   infoWindowFilter:{"title": "$[soumnameen] Soum, $[aimagnameen] Aimag","subtitle":"","tabs": [{"title": "<b>Payments</b>","type": "text","value": "Payment data summarized by soum.\nTotal payments: $[totalpaysum] thousand ₮\nPayments to central budget: $[centralpaysum] thousand ₮\nPayments to local budget: $[localpaysum] thousand ₮"},{"title": "<b>Minerals</b>","type": "text","value": "Resources being extracted in the soum\nGold: $[gold]\nCopper: $[copper]\nIron: $[iron]\nCoal: $[coal]\nPetroleum: $[petroleum]\nOther: $[other]\nOther minerals include molybdenum, spar, uranium, lignite, plumbum, zinc, sulfide, rocks and construction materials"},{"title": "<b>Companies</b>","type": "text","value": "Companies reporting in this soum and their registration numbers:\n$[complistpay]"},{"title": "<b>About</b>","type": "text","value": "Payment data was extracted from the 2010 EITI report, and aggregated to soums in which companies are actively extractive resources. Only companies operating in a single soum were included. See the About page for more details."}]},
   "National payments":  {"infoWindowFilter": {"subtitle": "Sum of payments to central budget: $[centralpaysum] thousand ₮"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "centralpaysum","categories": 5, "color": [0xEBD9C2]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xEBD9C2]},"expression":"$[centralpaysum] > 0"},
  "Local payments":  {"infoWindowFilter": {"subtitle": "Sum of payments to local budgets: $[localpaysum] thousand ₮"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "localpaysum","categories": 5,"color": [0xD1B79F]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xD1B79F]},"expression":"$[localpaysum] > 0"},
  "Total payments":  {"infoWindowFilter": {"subtitle": "Sum of all payments: $[totalpaysum] thousand ₮"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "totalpaysum","categories": 5,"color": [0xA4866D]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xA4866D]},"expression":"$[totalpaysum] > 0"}
  },
 
 "Company": {
   infoWindowFilter:{"title": "$[company_name]","subtitle":"", "tabs": [{"title": "<b>Company Info</b>","type": "text","value": "Company name: $[company_name]\nRegistration number:: $[registration_number]\nInvestment agreement: $[invest_agree]"},{"title": "<b>Minerals</b>","type": "text","value": "Resources being extracted in the soum\nGold: $[gold]\nCopper: $[copper]\nIron: $[iron]\nCoal: $[coal]\nPetroleum: $[petroleum]\nOther: $[other]\nOther minerals include molybdenum, spar, uranium, lignite, plumbum, zinc, sulfide, rocks and construction materials"},{"title": "<b>About</b>","type": "text","value": "Company data was extracted from the 2010 EITI report, and shows all soums in which companies are actively extractive resources. See the About page for more details."}]},
   "Location":  {"infoWindowFilter": {"subtitle": "Total EITI 2010 payments: $[totalpay] thousand ₮"},"type": "PRIMITIVE","stroke": {"color": [0x361E18], "weight": 1, "opacity": 0.75},"fill":{"color":[0x543E36],"opacity": 0.75}},
  },

 "Donations": {
   infoWindowFilter:{"title": "$[soumnameen] Soum, $[aimagnameen] Aimag","subtitle":"","tabs": [{"title": "<b>Data</b>","type": "text","value": "Sum of donations and contributions reported at the soum level.\nDonations: $[donation_sum] thousand ₮\nEnvironmental fund contributions: $[envcontrib_sum] thousand ₮\nLocal taxes, fees, etc: $[payment_sum] thousand ₮\nNumber of transactions: $[transaction_number]"},{"title": "<b>About</b>","type": "text","value": "Companies volunteered information on how much they paid to local environmental funds for rehabilitation, donations made to local activities and organizations, and local taxes, fees and royalties. Prepared for the 2010 EITI report. See the About page for more details."}]},
   "Transaction count":  {"infoWindowFilter": {"subtitle": "Number of transactions made: $[transaction_number]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "transaction_number","categories": 5, "color": [0x361E18]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x361E18]}},
  "Total donations":  {"infoWindowFilter": {"subtitle": "Total value of donations made in soum: $[donation_sum] thousand ₮"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "donation_sum","categories": 5,"color": [0x7C6253]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x7C6253]}},
  "Environmental contributions":  {"infoWindowFilter": {"subtitle": "Total payments into environmental fund: $[envcontrib_sum] thousand ₮"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "envcontrib_sum","categories": 5,"color": [0x4A342C]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x4A342C]}}
  },

 "Special Protected Areas": {
   infoWindowFilter:{"title": "$[placenamee] Special Protected Area","subtitle":"","tabs": [{"title": "<b>Data</b>","type": "text","value": "Special protected area boundaries provided by the Environmental Information Center. See the About page for more information"}]},
   "Location":  {"infoWindowFilter": {"subtitle": ""},"type": "PRIMITIVE","stroke": {"color": [0x238443], "weight": 1, "opacity": 0.75},"fill":{"color":[0x238443],"opacity": 0.75}},
  },

"Forest": {
   infoWindowFilter:{"title": "Forested Area","subtitle":"","tabs": [{"title": "<b>About</b>","type": "text","value": "Coverage of forest area in Mongolia. Data provided by the Environmental Information Center."}]},
   "Location":  {"infoWindowFilter": {"subtitle": ""},"type": "PRIMITIVE","stroke": {"color": [0x005A32], "weight": 1, "opacity": 0.75},"fill":{"color":[0x005A32],"opacity": 0.75}},
  },

  "Infant Mortality": {source: "finder:", title:"Infant Mortality Rate", subtitle: "Per 1,000 live births, in $[aimagnameen] Aimag", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [0xFEF7A5, 0xFECE6D, 0xEC8414, 0xAE4C02, 0x662506], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "infantmort"}}, infosubtitle: null, table: null, description: "Infant deaths per 1,000 live births in the 2nd quarter of 2012. Infant mortality rate is the number of infant deaths (deaths before reaching one year of age) per 1,000 for the ten year period preceding the survey.\nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
  
  "Population": {source: "finder:", title:"Population", subtitle: "Number of People", styles: { type: "CHOROPLETH",stroke: {color: 0x222222}, fill: { colors: [0xEFF3FF, 0xBDD7E7, 0x6BAED6, 0x3182BD, 0x08519C], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "population"}}, infosubtitle: "The number of people in $[aimagnameen] Aimag", table: null, description: "The number of people in each aimag in 2010.\nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
  
  "Unemployment": {source: "finder:", title:"Unemployment", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [0xFEE5D9, 0xFCAE91, 0xFB6A4A, 0xDE2D26, 0xA50F15], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "unemployment"}}, infosubtitle: "The number of people in $[aimagnameen] Aimag not employed in the first half of 2012", table: null, description: "The number of people in each aimag not employed in the first half of 2012. Source: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
  
  "Number of Physicians": {source: "finder:", title:"Number of Physicians", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [15456706, 13744031, 10782317, 8151635, 4863020], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "physnum"}}, infosubtitle: "The number of physicians in $[aimagnameen] Aimag", table: null, description: "The number of physicians in each aimag in 2010. \nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
  
  "Number of Households": {source: "finder:", title:"Number of Households (thousands)", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [5313667, 8608676, 12619965, 14924738, 16573399], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "housenum"}}, infosubtitle: "The number of households in $[aimagnameen] Aimag, in thousands", table: null, description: "The number of households in each aimag in 2010. \nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
  
  "Soum Boundaries":{source: "finder:", title:"$[soumnameen] Soum, $[aimagnameen] Aimag", selectedAttribute:"soumnameen",subtitle: "",styles: {type: "PRIMITIVE",stroke: {color: 0x222222, weight: 1, opacity: 0.75},fill:{color:[0xCCCC66],opacity: 0.75}},infosubtitle: "$[soumnameen] Soum", table: null, description: "Soum boundaries provided by the <a href='http://www.icc.mn/' target='_new'>Environmental Information Center</a>."},
  
  };
  })();
