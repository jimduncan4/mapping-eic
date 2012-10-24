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
   infoWindowFilter:{"title": "$[soumnameen] Soum, $[aimagnameen] Aimag","subtitle":"","tabs": [{"title": "<b>Payments</b>","type": "text","value": "Payment data summarized by soum.\nTotal payments: $[totalpaysum]\nPayments to central budget: $[centralpaysum]\nPayments to local budget: $[localpaysum]"},{"title": "<b>Minerals</b>","type": "text","value": "Resources being extracted in the soum\nGold: $[gold]\nCopper: $[copper]\nIron: $[iron]\nCoal: $[coal]\nPetroleum: $[petroleum]\nOther: $[other]\nOther minerals include molybdenum, spar, uranium, lignite, plumbum, zinc, sulfide, rocks and construction materials"},{"title": "<b>Companies</b>","type": "text","value": "Companies reporting in this soum and their registration numbers:\n$[complistpay]"},{"title": "<b>About</b>","type": "text","value": "Payment data was extracted from the 2010 EITI report, and aggregated to soums in which companies are actively extractive resources. Only companies operating in a single soum were included. See the About page for more details."}]},
   "National payments":  {"infoWindowFilter": {"subtitle": "Sum of payments to central budget: MNT(000) $[centralpaysum]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "centralpaysum","categories": 5, "color": [0xEBD9C2]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xEBD9C2]},"expression":"$[centralpaysum] > 0"},
  "Local payments":  {"infoWindowFilter": {"subtitle": "Sum of payments to local budgets: MNT(000) $[localpaysum]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "localpaysum","categories": 5,"color": [0xD1B79F]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xD1B79F]},"expression":"$[localpaysum] > 0"},
  "Total payments":  {"infoWindowFilter": {"subtitle": "Sum of all payments: MNT(000) $[totalpaysum]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "totalpaysum","categories": 5,"color": [0xA4866D]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0xA4866D]},"expression":"$[totalpaysum] > 0"}
  },
 
 "Company": {
   infoWindowFilter:{"title": "$[company_name]","subtitle":"", "tabs": [{"title": "<b>Company Info</b>","type": "text","value": "Company name: $[company_name]\nRegistration number:: $[registration_number]\nInvestment agreement: $[invest_agree]"},{"title": "<b>Minerals</b>","type": "text","value": "Resources being extracted in the soum\nGold: $[gold]\nCopper: $[copper]\nIron: $[iron]\nCoal: $[coal]\nPetroleum: $[petroleum]\nOther: $[other]\nOther minerals include molybdenum, spar, uranium, lignite, plumbum, zinc, sulfide, rocks and construction materials"},{"title": "<b>About</b>","type": "text","value": "Company data was extracted from the 2010 EITI report, and shows all soums in which companies are actively extractive resources. See the About page for more details."}]},
   "Location":  {"infoWindowFilter": {"subtitle": "Total EITI 2010 payments: MNT(000) $[totalpay]"},"type": "PRIMITIVE","stroke": {"color": [0x361E18], "weight": 1, "opacity": 0.75},"fill":{"color":[0x543E36],"opacity": 0.75}},
  },

 "Donations": {
   infoWindowFilter:{"title": "$[soumnameen] Soum, $[aimagnameen] Aimag","subtitle":"","tabs": [{"title": "<b>Data</b>","type": "text","value": "Sum of donations and contributions reported at the soum level.\nDonations: $[donation_sum] million Tugrik\nEnvironmental fund contributions: $[envcontrib_sum] million Tugrik\nLocal taxes, fees, etc: $[payment_sum] million Tugrik\nNumber of transactions: $[transaction_number]"},{"title": "<b>About</b>","type": "text","value": "Companies volunteered information on how much they paid to local environmental funds for rehabilitation, donations made to local activities and organizations, and local taxes, fees and royalties. Prepared for the 2010 EITI report. See the About page for more details."}]},
   "Transaction count":  {"infoWindowFilter": {"subtitle": "Number of transactions made: $[transaction_number]"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "transaction_number","categories": 5, "color": [0x361E18]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x361E18]}},
  "Total donations":  {"infoWindowFilter": {"subtitle": "Total value of donations made in soum: $[donation_sum] million Tugrik"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "donation_sum","categories": 5,"color": [0x7C6253]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x7C6253]}},
  "Environmental contributions":  {"infoWindowFilter": {"subtitle": "Total payments into environmental fund: $[envcontrib_sum] million Tugrik"},"icon": {"opacity": 0.75,"size": 1,"symbol": "propCircle","propSize": null,"classificationType": "Quantile","gradSize": 1,"dropShadow": true,"selectedAttribute": "envcontrib_sum","categories": 5,"color": [0x4A342C]},"type": "GRADUATED","stroke": {"alpha": 1,"weight": 1,"color": 137011},"fill": {"opacity": 0.75,"color": [0x4A342C]}}
  },

 "Special Protected Areas": {
   infoWindowFilter:{"title": "$[placenamee] Special Protected Area","subtitle":"","tabs": [{"title": "<b>Data</b>","type": "text","value": "Special protected area boundaries provided by the Environmental Information Center. See the About page for more information"}]},
   "Location":  {"infoWindowFilter": {"subtitle": ""},"type": "PRIMITIVE","stroke": {"color": [0x238443], "weight": 1, "opacity": 0.75},"fill":{"color":[0x238443],"opacity": 0.75}},
  },

"Forest": {
   infoWindowFilter:{"title": "Forested Area","subtitle":"","tabs": [{"title": "<b>About</b>","type": "text","value": "Coverage of forest area in Mongolia. Data provided by the Environmental Information Center."}]},
   "Location":  {"infoWindowFilter": {"subtitle": ""},"type": "PRIMITIVE","stroke": {"color": [0x005A32], "weight": 1, "opacity": 0.75},"fill":{"color":[0x005A32],"opacity": 0.75}},
  },

"Aimag indicators": {}
  };
  })();
