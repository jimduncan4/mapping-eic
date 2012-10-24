var proxy_host = "http://geocommons.com";    
var project_attributes = ["id","project_name","totalamt","prodlinetext","grantamt","mjsector1","boardapprovaldate","majorsector_percent"];
var major_sector_name = "mjsector 1";
var barchart;

function getQuerystring(key, default_)
{
    if (default_==null) default_="";
//    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                        var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
                        var qs = regex.exec(window.location.href);
                        if(qs == null)
                        return default_;
                        else
                        return qs[1];
                        };
                        
                        
startList = function() 
{
    
    if (document.all&&document.getElementById) {
        navRoot = document.getElementById("navmenu");
        for (i=0; i<navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
        }
    }
}

window.onload=startList;

function twt_click() 
{
    u=location.href;t=document.title;window.open('http://twitter.com/home?status=?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}

function fbs_click() {
    u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}


if(typeof(F1)=='undefined') {F1 = {};}

(function(){
    if(typeof String.prototype.trim != 'function') {
        String.prototype.trim = function() 
        {
            return this.replace(/^\s+|\s+$/g, '');
        }  
    };
                         
    Array.prototype.first = function() 
    {
        return this[0];
    };
    
    Array.prototype.clone = function() 
    {
        return this.slice();
    };
    
    Object.size = function(obj) 
    {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) { size++; }
        }
        return size;
    };
    
    Object.include = function(arr, obj) 
    {
        for(var i=0; i<arr.length; i++) {
            if (arr[i] == obj) { return i; }
        }
        return null;
    }
    
    Array.prototype.flatten = function flatten()
    {
        var flat = [];
        for (var i = 0, l = this.length; i < l; i++){
            var type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase().trim();
            if (type) { flat = flat.concat(/^(array|collection|arguments)$/.test(type) ? flatten.call(this[i]) : this[i]); }
        }
        return flat;
    };
    
                         
    String.prototype.capitalize = function()
    {
        return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };
    
    String.prototype.wordwrap = function( width, brk, cut ) 
    {
        brk = brk || '\n';
        width = width || 75;
        cut = cut || false;
        if (!this) { return this; }
        var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
        return this.match( RegExp(regex, 'g') ).join( brk );
    }

    F1.WorldBank = function(options) //constructor
    {
        this.options = options;
    };
 
    F1.WorldBank.indicators = {
        "Infant Mortality": {source: "finder:", title:"Infant Mortality Rate", subtitle: "Per 1,000 live births, in $[aimagnameen] Aimag", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [0xFEE5D9, 0xFCAE91, 0xFB6A4A, 0xDE2D26, 0xA50F15], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "infantmort"}}, infosubtitle: null, table: null, description: "Infant deaths per 1,000 live births in the 2nd quarter of 2012. Infant mortality rate is the number of infant deaths (deaths before reaching one year of age) per 1,000 for the ten year period preceding the survey.\nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},    
        "Population": {source: "finder:", title:"Population", subtitle: "Number of People", styles: { type: "CHOROPLETH",stroke: {color: 0x222222}, fill: { colors: [0xEFF3FF, 0xBDD7E7, 0x6BAED6, 0x3182BD, 0x08519C], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "population"}}, infosubtitle: "The number of people in $[aimagnameen] Aimag", table: null, description: "The number of people in each aimag in 2010.\nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},
        "Unemployment": {source: "finder:", title:"Unemployment", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [0xFEE5D9, 0xFCAE91, 0xFB6A4A, 0xDE2D26, 0xA50F15], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "unemployment"}}, infosubtitle: "The number of people in $[aimagnameen] Aimag not employed in the first half of 2012", table: null, description: "The number of people in each aimag not employed in the first half of 2012. Source: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},    
        "Number of Physicians": {source: "finder:", title:"Number of Physicians", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [15456706, 13744031, 10782317, 8151635, 4863020], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "physnum"}}, infosubtitle: "The number of physicians in $[aimagnameen] Aimag", table: null, description: "The number of physicians in each aimag in 2010. \nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},	
        "Number of Households": {source: "finder:", title:"Number of Households (thousands)", subtitle: "", styles: { type: "CHOROPLETH", stroke: {color: 0x222222}, fill: { colors: [5313667, 8608676, 12619965, 14924738, 16573399], categories: 5, classificationNumClasses: 5, classificationType: "QUANTILE", opacity: 0.75, selectedAttribute: "housenum"}}, infosubtitle: "The number of households in $[aimagnameen] Aimag, in thousands", table: null, description: "The number of households in each aimag in 2010. \nSource: <a href='http://www.nso.mn/v3/index2.php?page=free_access' target='_new'>National Statistical Office of Mongolia</a>."},	
        "Soum Boundaries":{source: "finder:", title:"$[soumnameen] Soum, $[aimagnameen] Aimag", selectedAttribute:"soumnameen",subtitle: "",styles: {type: "PRIMITIVE",stroke: {color: 0x222222, weight: 1, opacity: 0.75},fill:{color:[0xCCCC66],opacity: 0.75}},infosubtitle: "$[soumnameen] Soum", table: null, description: "Soum boundaries provided by the <a href='http://www.icc.mn/' target='_new'>Environmental Information Center</a>."},
        "Special Protected Areas":{source: "finder",title:"Special Protected Areas", selectedAttribute:"placenamee",subtitle:"",styles:{}},
        "Forest": {source: "finder", title: "Forested areas", selectedAttribute:"", subtitle:"",styles:{}},
        "Licenses":{source: "finder:", title:"Licenses", selectedAttribute:"licenses",styles: {}},
        "EITI":{source: "finder:", title:"EITI", selectedAttribute:"eiti",styles: {}},
        "Donations":{source: "finder:", title:"Donations", selectedAttribute:"eiti",styles: {}},
        "Company":{source: "finder:", title:"Company", selectedAttribute:"company",styles: {}},
    };
 
    F1.WorldBank.prototype = {
    
    init: function(map_id, country, region, country_attrs, embed, callback) 
        {
            var self = this;
            this.activities = {};
            this.projects = country_attrs.projects;
            this.visibleSectors = [];
            this.map_id = map_id;
            if(embed !== undefined && embed !== null)
                this.embed = embed;
            else
                this.embed = false;
            if(country_attrs.regions !== undefined && country_attrs.regions !== null)
                this.regions = country_attrs.regions;
            else
                this.regions = {};
            
            this.total_funding = 0;
            this.stylelayers = {};
            this.initialized = false;
            this.current_projects = true;
            this.country = country;
            this.region = region;
            this.country_attrs = country_attrs;
            this.productlines = {}
            this.current_indicator = (country_attrs.indicators !== undefined && country_attrs.indicators.length > 0) ? country_attrs.indicators[0] : null;
            this.cb = callback;
            this.page_type = country_attrs.page_type;
            this.thematic_area = country_attrs.thematic_area;
            if(this.thematic_area === undefined || this.thematic_area === null)
                this.thematic_area = "m4r";
        
            this.wbicons = {"Agriculture, fishing, and forestry":"http://maps.worldbank.org/images/icons/round/agriculture-16.png","Information and communications":"http://maps.worldbank.org/images/icons/round/communication-16.png","Education":"http://maps.worldbank.org/images/icons/round/education-16.png","Energy and mining":"http://maps.worldbank.org/images/icons/round/energy-16.png","Finance":"http://maps.worldbank.org/images/icons/round/finance-16.png","Health and other social services":"http://maps.worldbank.org/images/icons/round/health-16.png","Industry and trade":"http://maps.worldbank.org/images/icons/round/industry-16.png","Public Administration, Law, and Justice":"http://maps.worldbank.org/images/icons/round/public-16.png","Transportation":"http://maps.worldbank.org/images/icons/round/transportation-16.png","Water, sanitation and flood protection":"http://maps.worldbank.org/images/icons/round/water-16.png"};
       
            var color_index = 3;
            this.sectors = {
                "agriculture": {name: "Agriculture, fishing, and forestry", sector_code: "AX", color: self.fadeHex("#8bb131","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "agriculture", icon: "http://maps.worldbank.org/images/icons/round/agriculture-on.png"},
                "communications": {name: "Information and communications", sector_code: "CX", color: self.fadeHex("#395f8f","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "communications", icon: "http://maps.worldbank.org/images/icons/round/communication-on.png"},
                "education": {name: "Education", sector_code: "EX", color: self.fadeHex("#eebd00","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "education", icon: "http://maps.worldbank.org/images/icons/round/education-on.png"},
                "energy": {name: "Energy and mining", sector_code: "LX", color: self.fadeHex("#880000","#FFFFFF",10)[color_index],	funding: 0, projects: [], activities: 0, shortname: "energy", icon: "http://maps.worldbank.org/images/icons/round/energy-on.png"},
                "finance": {name: "Finance", sector_code: "FX", color: self.fadeHex("#40823f","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "finance", icon: "http://maps.worldbank.org/images/icons/round/finance-on.png"},
                "health": {name: "Health and other social services", sector_code: "JX", color: self.fadeHex("#c23001","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "health", icon: "http://maps.worldbank.org/images/icons/round/health-on.png"},
                "industry": {name: "Industry and trade", sector_code: "YX", color: self.fadeHex("#7f4410","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "industry", icon: "http://maps.worldbank.org/images/icons/round/industry-on.png"},
                "public": {name: "Public Administration, Law, and Justice", sector_code: "BX", color: self.fadeHex("#8060a4","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "public", icon: "http://maps.worldbank.org/images/icons/round/public-on.png"},
                "water": {name: "Water, sanitation and flood protection", sector_code: "WX", color: self.fadeHex("#369fd0","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "water", icon: "http://maps.worldbank.org/images/icons/round/water-on.png"},
                "transportation": {name: "Transportation", sector_code: "TX", color: self.fadeHex("#d28807","#FFFFFF",10)[color_index], funding: 0, projects: [], activities: 0, shortname: "transportation", icon: "http://maps.worldbank.org/images/icons/round/transportation-on.png"}};
            
            this.sector_names = {};
            this.sector_codes = {};
            
            var sector;
            
            for( var index in self.sectors)
            {
                sector = self.sectors[index];
                if(country_attrs.sectors !== undefined && country_attrs.sectors !== null && country_attrs.sectors[sector.name] !== null) {
                    sector.funding = country_attrs.sectors[sector.name];
                    self.total_funding += country_attrs.sectors[sector.name];
                }
                self.sector_names[sector.name.toLowerCase().trim()] = index;
                self.sector_codes[sector.sector_code] = sector;
            }
            
                         
            if(map_id !== undefined && map_id !== null && map_id.length != 0)
            {
                this.map = new F1.Maker.Map( { dom_id:"wb_map",map_id:map_id,
                                            uiZoom: false,uiLayers: false,uiLegend: false,uiStyles: true,
                                            uiHeader: true,hideGCLogo: true,hideGILogo: false,
                                            core_host:	proxy_host + '/', finder_host:proxy_host + '/', maker_host: proxy_host + '/',
                                            onMapLoaded: function() { setTimeout("wb.loadedMap()",500); },
                                            onFeatureSelected: function(features) { if(self.country == "World" && features.features.length > 0) {
                                            var country = features.features[0]; window.location = "/" + country.region.toLowerCase() + "/" + country["lowercase country name"].toLowerCase().replace(/\s+/g,'-') ;
                                            }},
                                            flashvars: {country: self.country}
                                            });
            } 
            
            else 
            {
                self.sectorPieChart("all", false);
                self.regionFundingBars();
            }

        },
 
    setState: function(location,indicator,project,sectors) 
        {
            var self = this;
            
            if(location !== undefined && location !== null)
                setLocation("",location.lat,location.lon,location.zoom);
            
            if(indicator !== undefined && indicator !== null)
                this.setIndicator(indicator);
            
            if(sectors !== undefined && sectors !== null)
            {
                jq.each(sectors, function(sector) 
                        {
                        self.toggleSector(sectors[sector], true);
                        })
                
            } 
            
            else 
            {
                this.toggleSector('none', false)
            }
    
            return false;},
        
    setBookmark: function(key, value) 
        {
            var options = document.location.hash.split("&")
            var hash = "";
            jq.each(options, function(index,option) {
                    if(option !== undefined && option !== null && option != "" && option != "#") {
                    var vals = option.split("=")
                    if(vals[0] === key) {
                    vals[1] = value
                    key = null;
                    }
                    hash += "&" + vals[0] + "=" + vals[1];
                    }
                    });

            if(key !== undefined && key !== null)
                hash += "&" + key + "=" + value;
            
            document.location.hash = hash;
            return false;
        },
                         
    getBookmark: function(key) 
        {
            var options = document.location.hash.split("&")
            var value = null;
            jq.each(options, function(index,option) {
                    var vals = option.split("=")
                    if(vals[0] === key)
                    value = vals[1]
                    });
            return value;
        },// updates the URL hash with current states
    
    saveState: function() 
        {
            var center = this.map.getCenterZoom();
            this.setBookmark("location",center[0].lat.toFixed(6) + "," + center[0].lon.toFixed(6) + "," + center[1])
            var vs = ""
            jq.each(this.visibleSectors, function(index,sector) { vs += sector + ","; });
            this.setBookmark("sectors",vs);
            if(this.current_indicator !== undefined && this.current_indicator !== null)
                this.setBookmark("indicator",this.current_indicator.replace(/ /g,'_'));
            return false;
        },
        // uses the URL hash to set current viewed state

    loadState: function() 
        {
            var self = this;
            var center = this.getBookmark("location");
            if(center !== undefined && center !== null) {
                var loc = center.split(",")
                self.setLocation("",loc[0],loc[1],loc[2])
            }
            var vs = this.getBookmark("sectors");
            if(vs !== undefined && vs !== null && vs !== "") {
                self.toggleSector("none", false, false)
                var sectors = vs.split(",");
                jq.each(sectors, function(index, sector) { if(sector !== "") self.toggleSector(sector, true, false)})
            }
            var indicator = this.getBookmark("indicator");
            if(indicator !== undefined && indicator !== null) {
                self.setIndicator(indicator.replace(/_/g,' '));
            }
            
            return false;	
        },	
        
    updateEmbedLink: function() 
        {
            this.saveState();
            var base_link = document.location.protocol + "//" + document.location.host + document.location.pathname;
            var view_link = document.location.hash.replace(/&/g,'&');
            var url = base_link + document.location.hash;
            var iframe = "<iframe src='" + base_link + "/embed?width=800&height=400" + view_link + "' height='400' width='800' scrolling='no' frameborder='0'></iframe><br /><a href='" + url + "'>World Bank's Mapping for Results</a>"
            jq("#embed_code").val(iframe);
            jq("#share_link").attr("value", url);
            return false;
        },
        
    setLocation: function(region,lat,lon,zoom) 
        {
            this.map.setCenterZoom(lat,lon,zoom);
            return false;
        },

    hideSectors: function() 
        {
            var self = this;
            jq.each(self.sectors, function (sector) {
                    self.map.addFilter(self.stylelayers["Project Locations"].guid, {expression: "$[" + major_sector_name + "] == " + self.sectors[sector].shortname});
                    });
            return false;
        },
 
    setMapTitle: function() 
        {
            var title = "";
            if(this.current_projects)
                title += "Projects by ";
            if(this.current_indicator)
                title += this.current_indicator;
            
            jq('#map-title').html(title)
            return false;
        },
        
    setExtractiveIndicator: function(indicator, attribute, title, visible) 
        {
            var self = this;
            
            //s_attr points to the extractives.js definitions to get values for filtering, naming tabs and titles, etc.
            var s_attr = F1.WorldBank.extractives[indicator][attribute];
            
            
            if(indicator == "Special Protected Areas") {
                var layervisible=self.map.getLayers();
                if(layervisible[self.stylelayers[indicator].order].visible){
                    self.map.showLayer(self.stylelayers[indicator].guid, false);
                }
                else {
                    self.map.showLayer(self.stylelayers[indicator].guid, true);
                }
            }
            
            if(indicator == "Forest") {
                var layervisible=self.map.getLayers();
                if(layervisible[self.stylelayers[indicator].order].visible){
                    self.map.showLayer(self.stylelayers[indicator].guid, false);
                }
                else {
                    self.map.showLayer(self.stylelayers[indicator].guid, true);
                }
            }

            else {
                //District revenues check and Mines check disables
                //self.map.showLayer(self.stylelayers["District revenues"].guid, false);

                if(indicator=="Licenses"){
                    self.map.clearFilters(self.stylelayers[indicator].guid);
                    self.map.addFilter(self.stylelayers[indicator].guid, {expression : s_attr["expression"]});
                    self.map.showLayer(self.stylelayers["EITI"].guid,false);
                    self.map.showLayer(self.stylelayers["Company"].guid,false);
                    self.map.showLayer(self.stylelayers["Donations"].guid,false);
                    self.map.showLayer(self.stylelayers["Licenses"].guid, true);
                    jq('#layercontrol_company').html("Not Shown");
                    jq('#layercontrol_extractives').html(title);
                }
                else if (indicator=="EITI"){
                    self.map.showLayer(self.stylelayers["Licenses"].guid,false);
                    self.map.showLayer(self.stylelayers["Company"].guid,false);
                    self.map.showLayer(self.stylelayers["Donations"].guid,false);
                    self.map.showLayer(self.stylelayers["EITI"].guid, true);
                    self.showVisibleMines(indicator,"Company");
                    jq('#layercontrol_company').html(title);
                    jq('#layercontrol_extractives').html("Not Shown");
                }
                
                else if (indicator=="Donations"){
                    self.map.showLayer(self.stylelayers["Licenses"].guid,false);
                    self.map.showLayer(self.stylelayers["Company"].guid,false);
                    self.map.showLayer(self.stylelayers["EITI"].guid,false);
                    self.map.showLayer(self.stylelayers["Donations"].guid, true);
                    jq('#layercontrol_company').html(title);
                    jq('#layercontrol_extractives').html("Not Shown");
                }
                else if (indicator=="Company"){
                    self.map.showLayer(self.stylelayers["Licenses"].guid,false);
                    self.map.showLayer(self.stylelayers["EITI"].guid,false);
                    self.map.showLayer(self.stylelayers["Donations"].guid,false);
                    self.map.showLayer(self.stylelayers["Company"].guid, true);
                    self.showVisibleMines(indicator,"EITI");
                    jq('#layercontrol_company').html(title);
                    jq('#layercontrol_extractives').html("Not Shown");

                }
                //self.map.showLayer(self.stylelayers["Mines"].guid, true);
                //self.map.showLayer(self.stylelayers["Oil wells"].guid, true);
            }
            
            //When showing by location, first assign image icons based on the Mineral Type attribute, then use setLayerStyle to trigger a change the in layer styling.
            if(attribute == "Location"){
                self.map.setLayerStyle(self.stylelayers[indicator].guid, s_attr);
            }
            //When showing by quantities, use the styling information contained in the layer definition - needs to be separate
            else {
                // s_attr.icon.selectedAttribute = attribute;
                //self.map.clearFilters(self.stylelayers[indicator].guid);
                //self.map.addFilter(self.stylelayers[indicator].guid, {expression : s_attr["expression"]});
                self.map.setLayerStyle(self.stylelayers[indicator].guid, s_attr);	
            }
            
            self.map.setLayerInfoWindow(self.stylelayers[indicator].guid, {
                                        title: F1.WorldBank.extractives[indicator]["infoWindowFilter"]["title"],
                                        subtitle: s_attr["infoWindowFilter"]["subtitle"], tabs: F1.WorldBank.extractives[indicator]["infoWindowFilter"]["tabs"]});
            
            
            return false;
        },
        
    toggleExtractive: function(layer,offlayer,sector,visible) 
        {
            var self = this;
            var layervisible=self.map.getLayers();
            

            if(layer == "EITI" || layer == "Company") {
                var classname = "#" + sector + "mine_control";
                if(visible == true || jq(classname).hasClass("inactive")) {
                    jq(classname).removeClass('inactive').addClass('active');
                } 
                else {
                    jq(classname).removeClass('active').addClass('inactive');
                }
                if(layervisible[self.stylelayers[layer].order].visible){
                    self.showVisibleMines(layer, offlayer);
                }
                else if(layervisible[self.stylelayers[offlayer].order].visible){
                    self.showVisibleMines(offlayer, layer);
                }
            }
           
            else if(layer == "Mineral deposits") {
                var classname = "#" + sector + "deposit_control";
                if(visible == true || jq(classname).hasClass("inactive")) {
                    if(sector == "all") {
                        jq.each(jq('#ore_sectors li a'), function(el,index) {
                                jq(el).removeClass('inactive').addClass('active');
                                })
                        jq("#alldeposit_control").attr("checked", true)
                    } 
                    else {
                        jq(classname).removeClass('inactive').addClass('active');
                    }
                } 
                else {
                    if(sector == "all") {
                        jq.each(jq('#ore_sectors li a'), function(el,index) {
                                jq(el).removeClass('active').addClass('inactive');
                                })
                        jq("#alldeposit_control").attr("checked", false)
                    } 
                    else {
                        jq(classname).removeClass('active').addClass('inactive');
                        jq("#alldeposit_control").attr("checked", false)
                        
                    }
                }
                self.showVisibleDeposits();
            }
            return false;
        },
        
    showVisibleMines: function(layer,offlayer) 
        {
            var self = this;
            self.map.clearFilters(self.stylelayers[layer].guid);
            self.map.clearFilters(self.stylelayers[offlayer].guid);
//            self.map.showLayer(self.stylelayers[layer].guid, true);
            var visibleMines = jq.map(jq('#mines_sectors li a'), function(el,index) {
                                         if( jq(el).hasClass('active'))
                                         return jq(el).attr("original-title")
                                         })
            if(visibleMines.length != 0 ){
//                self.map.showLayer(self.stylelayers[layer].guid, true);
                
                self.map.addFilter(self.stylelayers[layer].guid,
                                   {expression: self.complexFilterExpression(visibleMines,"Yes")});
                self.map.addFilter(self.stylelayers[offlayer].guid,
                                   {expression: self.complexFilterExpression(visibleMines,"Yes")});
                self.map.showLayer(self.stylelayers[layer].guid, true);
                self.map.showLayer(self.stylelayers[offlayer].guid, false);
            } else {
                self.map.showLayer(self.stylelayers[layer].guid, false);
            }
        },
        
    showVisibleDeposits: function() 
        {
            var self = this;
            var layer = "Mineral deposits"
            
            self.map.clearFilters(self.stylelayers[layer].guid);
            self.map.showLayer(self.stylelayers[layer].guid, true);
            
            var visibleDeposits = jq.map(jq('#ore_sectors li a'), function(el,index) {
                                         if( jq(el).hasClass('active'))
                                         return jq(el).attr("original-title")
                                         })
            if(visibleDeposits.length != 0 ){
                self.map.showLayer(self.stylelayers[layer].guid, true);
                self.map.addFilter(self.stylelayers[layer].guid,
                                   {expression: self.complexFilterExpression(visibleDeposits, "mineral ty")});
            } else {
                self.map.showLayer(self.stylelayers[layer].guid, false);
            }
        },
        
    toggleSector: function(sector,visible,refreshCharts) 
        {
            var self = this;
            var visibleExpression = "";
            if(self.stylelayers["Project Locations"] === undefined || self.stylelayers["Project Locations"] === null) // World Map
                return;
            
            self.current_projects = visible;
            
            if(sector == "none") {
                self.visibleSectors = [sector];
                self.map.showLayer(self.stylelayers["Project Locations"].guid, visible);
                if(self.stylelayers["Project Counts"] !== undefined && self.stylelayers["Project Counts"] !== null) {
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, visible);
                }
                jq('#layercontrol_projects').html("No Activities");
                self.visibleSectors = [];
                jq('#map-content-icons').hide()
                jq('#map-content-regions').hide()
            } 
            else if(sector == 'all') {
                if(visible === undefined || visible === null)
                    visible = !(jq("#sall").attr('checked'));
                
                if(visible) {
                    try {self.map.clearFilters(self.stylelayers["Project Locations"].guid);} catch(err) {}
                    jq.each(self.sectors, function(sector) {
                            if(Object.include(self.visibleSectors, sector) === undefined || Object.include(self.visibleSectors, sector) === null)
                            self.visibleSectors.push(sector);
                            });
                } 
                else {
                    self.map.clearFilters(self.stylelayers["Project Locations"].guid);
                    self.map.addFilter(self.stylelayers["Project Counts"].guid, {expression: "$[admprecision] == 'ADM2'"});
                    self.visibleSectors = [];
                }
                jq("#sall").attr('checked', visible);
                self.map.showLayer(self.stylelayers["Project Locations"].guid, visible);
                if(self.stylelayers["Project Counts"] !== undefined)
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, !visible);
                jq('#layercontrol_projects').html("By Sector");
                jq('#map-content-icons').show()
                jq('#map-content-regions').hide()
                
            } 
            else if(sector == 'counts_admin1') {
                self.visibleSectors = [sector];
                if(self.stylelayers["Project Counts"] !== undefined) {
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, visible);
                    self.map.clearFilters(self.stylelayers["Project Counts"].guid);
                    self.map.addFilter(self.stylelayers["Project Counts"].guid, {expression: "$[admprecision] == 'ADM1'"});
                }
                self.map.showLayer(self.stylelayers["Project Locations"].guid, !visible);
                refreshCharts = false;	
                jq('#layercontrol_projects').html("By Count");
                jq('#map-content-icons').hide()
                jq('#map-content-regions').show()
                jq('input:radio[name="by_region"]').filter('[value="province"]').attr('checked', true);
                jq('input:radio[name="by_region"]').filter('[value="district"]').attr('checked', false);
                
            } 
            else if(sector == 'counts_admin2') {
                self.visibleSectors = [sector];
                if(self.stylelayers["Project Counts"] !== undefined){
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, visible);
                    self.map.clearFilters(self.stylelayers["Project Counts"].guid);
                    self.map.addFilter(self.stylelayers["Project Counts"].guid, {expression: "$[admprecision] == 'ADM2'"});
                }
                self.map.showLayer(self.stylelayers["Project Locations"].guid, !visible);
                refreshCharts = false;
                jq('#map-content-icons').hide()
                jq('#map-content-regions').show()
                jq('#layercontrol_projects').html("By Count");
                
                jq('input:radio[name="by_region"]').filter('[value="province"]').attr('checked', false);
                jq('input:radio[name="by_region"]').filter('[value="district"]').attr('checked', true);
                
            } 
            else if(sector == 'counts') {
                if(self.stylelayers["Project Counts"] !== undefined && self.stylelayers["Project Counts"] !== null)
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, visible);
                self.map.showLayer(self.stylelayers["Project Locations"].guid, !visible);
                refreshCharts = false;
                jq('#layercontrol_projects').html("By Count");
                
                jq('#map-content-icons').hide()
                jq('#map-content-regions').show()
            } 
            else if(sector === undefined || sector === null) {
                self.map.showLayer(self.stylelayers["Project Locations"].guid, false);
                if(self.stylelayers["Project Counts"] !== undefined)
                    self.map.showLayer(self.stylelayers["Project Counts"].guid, false);
            } 
            else {
                jq("#sall").attr('checked', false);	
                if(visible === undefined || visible === null)
                    visible = !(jq("#sectorcontrol_" + sector).hasClass('active'));
                
                if(visible == true){
                    if(self.stylelayers["Project Counts"] !== undefined && self.stylelayers["Project Counts"] !== null)
                        self.map.showLayer(self.stylelayers["Project Counts"].guid, false);
                    self.map.showLayer(self.stylelayers["Project Locations"].guid, false);
                    self.map.removeFilter(self.stylelayers["Project Locations"].guid,
                                          {expression: self.complexSectorExpression(self.visibleSectors)});
                    
                    if(Object.include(self.visibleSectors, sector) === undefined || Object.include(self.visibleSectors, sector) === null) {
                        self.visibleSectors.push(sector);	
                        
                        self.map.addFilter(self.stylelayers["Project Locations"].guid,
                                           {expression: self.complexSectorExpression(self.visibleSectors)});
                    }
                    
                    self.map.showLayer(self.stylelayers["Project Locations"].guid, true);
                    jq('#layercontrol_projects').html("By Sector");
                    jq('#map-content-regions').hide()
                    jq('#map-content-icons').show()
                    
                } 
                else if(visible == false){
                    
                    self.map.removeFilter(self.stylelayers["Project Locations"].guid,
                                          {expression: self.complexSectorExpression(self.visibleSectors)});
                    self.visibleSectors = jQuery.grep(self.visibleSectors, function(value) {
                                                      return value != sector;
                                                      });
                    self.map.addFilter(self.stylelayers["Project Locations"].guid, {expression: self.complexSectorExpression(self.visibleSectors)});
                    jq('#layercontrol_projects').html("Overview");
                }
            }
            self.setMapTitle();
            self.showVisibleSectors();
            
            if(refreshCharts === undefined || refreshCharts === null || refreshCharts == true)
                self.sectorPieChart(sector, false);
            
            // self.saveState();
            return false;
        },
        
    showVisibleSectors: function() 
        {
        var self = this;
        var sectorcontrols = jq('.sectorcontrol');
        
        jq.each(sectorcontrols, function(index, sc) {
                var sector_dom = jq("#" + sc.id);
                var sector = sector_dom.attr("sector-name");
                
                if(Object.include(self.visibleSectors, sector) != undefined || Object.include(self.visibleSectors, sector) != null) {
                sector_dom.removeClass('inactive').addClass('active');
                } else {
                sector_dom.removeClass('active').addClass('inactive');	
                }
                });
        
            return false;
        },
        
    complexFilterExpression: function(sectorFilters, sector_attribute) 
        {
            var self = this;
            var expression = "";
            
            for(var sector=0;sector<sectorFilters.length; sector++) {
//                expression += "$["+sector_attribute+"] == '" + sectorFilters[sector] + "'"; GHANA VERSION
                expression += "$["+sectorFilters[sector]+"] == '" + sector_attribute+"'"; //MONGOLIA VERSION
                if(sector != sectorFilters.length-1)
                    expression += " OR ";
            }
            return expression;
        },	
        
    complexSectorExpression: function(sectorFilters, sector_attribute) 
        {
            var self = this;
            var expression = "";
            if(sector_attribute === undefined || sector_attribute === null)
                sector_attribute = major_sector_name;
            
            for(var sector=0;sector<sectorFilters.length; sector++) {
                if(self.sectors[sectorFilters[sector]] !== undefined && self.sectors[sectorFilters[sector]] !== null ) {
                    expression += "$["+sector_attribute+"] == '" + self.sectors[sectorFilters[sector]].name + "'";
                    if(sector != sectorFilters.length-1)
                        expression += " OR ";
                }
            };
            return expression;
        },	
        
    setIndicator: function(indicator,visible) 
        {
            var self = this;
            
            log("indicator", indicator)	
            log("self.current_indicator",self.current_indicator)
            if(self.stylelayers[self.current_indicator] !== undefined)
                self.map.showLayer(self.stylelayers[self.current_indicator].guid, false);
            
            if(indicator === undefined || indicator === null) {
                jq('#layercontrol_indicators').html("Indicators");
                self.map.showLayer(self.stylelayers[indicator].guid, false);
            }
            else {
                jq('#layercontrol_indicators').html(indicator);
                
                var style = F1.WorldBank.indicators[indicator].styles;
                if (indicator!="Soum Boundaries") {
                    style.source = self.stylelayers[indicator].source;
                    if (self.current_indicator="Soum Boundaries"){
                        self.map.showLayer(self.stylelayers[indicator].guid,false);
                    }
                }
                
                if(self.stylelayers[indicator].sharedLayer)
                    self.map.setLayerStyle(self.stylelayers[indicator].guid, style);
                
                var infotabs = [];
                if(F1.WorldBank.indicators[indicator].table !== undefined && F1.WorldBank.indicators[indicator].table !== null)
                    infotabs.push({title: "Data", type:"table", value:F1.WorldBank.indicators[indicator].table})
                    if(F1.WorldBank.indicators[indicator].description !== undefined && F1.WorldBank.indicators[indicator].description !== null)
                        infotabs.push({title: "About", type: "text", value:F1.WorldBank.indicators[indicator].description})
                        var infosub = F1.WorldBank.indicators[indicator].subtitle;
                if(F1.WorldBank.indicators[indicator].infosubtitle !== undefined && F1.WorldBank.indicators[indicator].infosubtitle !== null)
                    infosub = F1.WorldBank.indicators[indicator].infosubtitle
                    
                    //infotabs.push({title:"Other Indicators", type: "text", value: "Maternal health: $[Maternal health]% of births attended by skilled health provider\nInfant mortality: $[Infant mortality] per 1000 live births\nMalnutrition: $[Malnutrition]%\nUnemployment rate: $[Unemployment rate]%\nRegional population: $[Regional population] people\nRegional population year: $[Regional population year]\nWealth quintile - highest: $[Wealth quintile - highest]%\nWealth quintile - second highest: $[Wealth quintile - second highest]%\nWealth quintile - fourth highest: $[Wealth quintile - fourth highest]%\nWealth quintile - lowest: $[Wealth quintile - lowest]%\nWealth quintile - middle: $[Wealth quintile - middle]%\nFor further information about these indicators, refer to the <a href='http://maps.worldbank.org/extractives/about' target='_new'>About page</a>"})
                    try {
                        self.map.setLayerInfoWindow(self.stylelayers[indicator].guid, {title: indicator + ": $["+ F1.WorldBank.indicators[indicator].styles.fill.selectedAttribute +"]", subtitle: infosub, tabs:infotabs});
                        
                        self.map.setLayerTitle(self.stylelayers[indicator].guid, F1.WorldBank.indicators[indicator].title);
                        self.map.setLayerSubTitle(self.stylelayers[indicator].guid, F1.WorldBank.indicators[indicator].subtitle);
                        self.map.showLayer(self.stylelayers[indicator].guid, true);
                        
                        // China Indicators for Poverty
                        if(self.stylelayers["No Data"] !== undefined && self.stylelayers["No Data"] !== null && self.country == "China") {
                            if(indicator == "Poverty") {
                                self.map.showLayer(self.stylelayers["No Data"].guid, true);
                            } else {
                                self.map.showLayer(self.stylelayers["No Data"].guid, false);
                            }
                        }
                    } catch(err) { }
                
            }
            self.current_indicator = indicator;
            self.setMapTitle();
            // return false;
            // self.saveState();
            return false;
        },
        
    highlightMine: function(attribute, mineral) 
        {
            var self = this;
            var highlightExpression = "$[" + attribute + "] == '"+mineral+"'";
            this.map.clearHighlights(self.stylelayers["Mines"].guid);
            this.map.addHighlight(self.stylelayers["Mines"].guid,{expression: highlightExpression});
        },
 
    highlightCompany: function(attribute, company)
        {
            var self = this;
            var highlightExpression = "$[" + attribute + "] == "+company;
            self.map.clearHighlights(self.stylelayers["Company"].guid);
//            this.map.addHighlight(self.stylelayers["Company"].guid,{expression: highlightExpression});
 self.map.addHighlight(self.stylelayers["Company"].guid, {expression: "$[gold]=='Yes'"});
        },
 
    highlightProject: function(project_id, project_name)
        {
            var self = this;
            if(project_name !== undefined && project_name !== null)
                jq("#sector_funding_description").html(project_name.capitalize());
            jq("#sector_funding_description").show();
            var highlightExpression = "$[project id] == '"+project_id+"'";
            this.map.clearHighlights(self.stylelayers["Project Locations"].guid);
            this.map.addHighlight(self.stylelayers["Project Locations"].guid,{expression: highlightExpression});
        },
        
    sortData: function(data) 
        {
            var self = this;
            self.activities = jq.map(data.features, function(feature) {
                                     if (feature) {
                                     attr = feature.attributes;
                                     if(self.projects[attr["project id"]] === undefined || self.projects[attr["project id"]] === null) { // first time we've seen this project ID
                                     var project = {};
                                     
                                     // Get the project level attributes
                                     for(var i = 0;i<project_attributes.length;i++) {
                                     if(project_attributes[i] != "activity count")
                                     project[project_attributes[i]] = attr[project_attributes[i]];
                                     }
                                     project["financing amount"] = attr["total amt"];
                                     project["financing"] = "$" + attr["total amt"] + " million";
                                     project["activity count"] = 0;
                                     self.projects[attr["project id"]] = project
                                     
                                     // Add to sector funding and project count
                                     var sector_name = project[major_sector_name];
                                     var wb_sector = self.sectors[self.sector_names[sector_name.toLowerCase().trim()]];
                                     
                                     if(wb_sector === undefined || wb_sector === null)
                                     wb_sector = self.sectors["public"];
                                     
                                     wb_sector.funding += attr["total amt"];
                                     wb_sector.projects.push(project);
                                     self.total_funding += wb_sector.funding;
                                     }
                                     self.projects[attr["project id"]]["activity count"] += 1;
                                     
                                     
                                     return attr;
                                     }
                                     });
            
        },
        
    sortProjects: function(data) 
        {
            var self = this;
            self.activities = jq.map(data, function(feature) {
                                     if (feature) {
                                     attr = feature;
                                     var amount = attr["totalamt"];
                                     
                                     if(self.projects[attr["id"]] === undefined || self.projects[attr["id"]] === null) { // first time we've seen this project ID
                                     var project = {};
                                     
                                     // Filter project
                                     // only count those with supplementprojectflg: "N"
                                     // recipient executed activities, count those with commitment amount is >=$5mUSD
                                     
                                     // Get the project level attributes
                                     for(var i = 0;i<project_attributes.length;i++) {
                                     // if(project_attributes[i] != "activity count")
                                     project[project_attributes[i]] = attr[project_attributes[i]];
                                     }
                                     project["financing amount"] = amount
                                     // project["activity count"] = 0;
                                     var mjsector_percent = {}
                                     
                                     self.projects[attr["id"]] = project
                                     
                                     var prodname = project["prodlinetext"];
                                     if(prodname !== undefined) {
                                     if(self.productlines[prodname] === undefined || self.productlines[prodname] === null) {
                                     self.productlines[prodname] = 0;
                                     }
                                     self.productlines[prodname] += amount;
                                     }
                                     // Add to sector funding and project count
                                     jq.each(project["majorsector_percent"], function(index,sector) {
                                             var sector_name = sector["Name"].toLowerCase().trim();
                                             var wb_sector = self.sectors[self.sector_names[sector_name]];
                                             
                                             if(wb_sector === undefined || wb_sector === null)
                                             wb_sector = self.sectors["public"];
                                             
                                             if(project["sector_funding"] === undefined || project["sector_funding"] === null)
                                             project["sector_funding"] = {}
                                             if(project["sector_funding"][wb_sector.shortname] === undefined || project["sector_funding"][wb_sector.shortname] === null)
                                             project["sector_funding"][wb_sector.shortname] = 0
                                             
                                             var actual_funding = (parseInt(sector["Percent"],10) / 100.0) * amount;
                                             project["sector_funding"][wb_sector.shortname] += actual_funding
                                             wb_sector.funding += actual_funding
                                             // There are duplicates in the Major Sector Percent listings
                                             if(Object.include(wb_sector.projects, project) === undefined || Object.include(wb_sector.projects, project) === null)	
                                             wb_sector.projects.push(project);
                                             });
                                     self.total_funding += amount;
                                     }
                                     // self.projects[attr["project id"]]["activity count"] += 1;
                                     
                                     return attr;
                                     }
                                     });
            
        self.projects.sort(function (a, b) {
                           return b.totalamt - a.totalamt;
                           });	
    },	
        
    projectTable: function(data) 
        {
            var self = this;
            
            var table = '<table id="project-info"><thead><tr>';
            jq.each(["Title","Project ID","Amount","Sector","Approval Date","Product Line"], function(index,header) {
                    table += tmpl(table_templates.th, {id: index,header: header});
                    });
            table += "</tr></thead><tbody>"
            
            jq.each(data, function(index, project) {
                    project["even"] = ((index+1) % 2 == 0) ? "row_even" : "row_odd";
                    table += tmpl(table_templates.project, project);
                    });
            table += "</tbody></table>"
            jq("#map-table").append(table);
            
            jq("#project-info tr").live("click", function() {
                                        self.highlightProject(jq(this).attr("data-project-id"), jq(this).attr("data-project-name"));
                                        });
            jq("#projects-bar").click(function() {
                                      if(jQuery(this).hasClass("expanded")) {
                                      jq("#map-table").hide("blind", { direction: "vertical" }, 2000);
                                      jq(this).removeClass("expanded").addClass("collapsed");	
                                      } else {
                                      jq("#map-table").show("blind", { direction: "vertical" }, 2000);
                                      jq(this).removeClass("collapsed").addClass("expanded");	
                                      }
                                      });	
            
            // jq('#project_count').html(Object.size(this.projects));
            // jq('#activity_count').html(this.activities.length);
            
        },
        
    sectorPieChart: function(sector_name, refreshControls) 
        {
            var self = this;
            
            var projects = [];
            var funding = 0;
            var sector_names = "";
            var opts = {}
            var width = 410;
            var char_length = 25;
            if( self.country == "World" || parseInt(self.country_attrs["projects_count"].replace(",","")) > 100) {
                width = 640;
                char_length = 47;
            }
            
            if(refreshControls === undefined || refreshControls === null || refreshControls == true){
                self.toggleSector("all", false, false); // watch recursion
                self.toggleSector(sector_name, true,false); // watch recursion
            }
            jq("#sector_funding_description").html(sector_name.capitalize());
            if(self.country != "World") {jq("#sector_funding_description").show();}
            var projects = []
            var links = []
            var colors = [];
            var labels = [];
            if (sector_name == 'none') {
                return;
            } else if(sector_name == "all") {
                
                sector_names = "All"
                jq.each(self.sectors, function (sector,sector_attrs) {
                        projects.push(sector_attrs)
                        });
                projects.sort(function (a, b) {
                              return b.funding - a.funding;
                              });	
                var data = []
                jq.each(projects, function (index,project) {
                        // self.sectors[self.sector_names[project.mjsector1.toLowerCase().trim()]].shortname
                        links.push("javascript:wb.sectorPieChart('" + project.shortname + "', true);");	
                        colors.push(project.color)
                        var financing = project.funding > 1000 ? (project.funding/1000).toFixed(2) + "b" : project.funding.toFixed(2) + "m"
                        labels.push(Textify.elide_during(project.name, char_length, '...' ) + " - $" + financing )
                        if( self.country == "World")
                        data.push({name:project.name + " - $" + financing,funding: project.funding})
                        else
                        data.push({name:project.name,funding: project.funding})
                        });
                
                pie_options = {"features":data,
                    "attributes": {"data":{"name": "Funding","original_name": "funding"},
                        "description":{"name": "Project","original_name": "name"},
                        "sort":{"name": "Funding","original_name": "funding"} }};
                
                funding = self.total_funding;
                opts["chart"] = {"legend": labels, "colors": colors}; // in here for pre-1.8 api calls
                opts["colors"] = colors; // for 1.8+ calls
                if(self.stylelayers["Project Locations"] !== undefined && self.stylelayers["Project Locations"] !== null)
                    opts["chart"]["onclick"] = function() {wb.toggleSector(links[this.bar.index])};
                
                var financing_total = funding > 1000 ? (funding/1000).toFixed(2) + " billion" : funding.toFixed(2) + " million";
                jq('#sector_funding_total').html("$" + financing_total); // + " <span class='subtotal' title='Global Financing'>/ $136.912 billion</span>"
                jq('#sector_funding_title').html("Financed Activities by Sector")
                
            } 
            else {
                projects = self.sectors[sector_name].projects;
                funding = self.sectors[sector_name].funding;
                
                var links = jq.map(projects, function (project,index) {
                                   labels.push(Textify.elide_during(project.project_name, 15, '...' ) + " - $" + project.sector_funding[sector_name].toFixed(2) + "m" )
                                   return "javascript:wb.highlightProject('" + project["id"] + "', '" + project["project_name"] + "');";	
                                   });
                
                pie_options = {"features":projects,
                    "attributes": {"data":{"name": "Funding","original_name": "financing amount"},
                        "description":{"name": "Project","original_name": "project_name"},
                        "sort":{"name": "Funding","original_name": "financing amount"} } };
                
                sector_names = wb.sectors[sector_name].name;
                var colors = self.fadeHex(self.sectors[sector_name].color, "#aaaaaa", 8);
                opts["chart"] = {legend: labels, colors: colors};
                opts["colors"] = colors;
                var financing_total = self.total_funding > 1000 ? (self.total_funding/1000).toFixed(2) + " billion" : self.total_funding.toFixed(2) + " million"
                
                jq('#sector_funding_total').html("$" + funding.toFixed(2) + " million <span class='subtotal' title='National Financing'>/ $"+ financing_total + "</span>");
                jq('#sector_funding_title').html("Financed Activities for " + sector_names + " Sector")
            }
            
            if(projects.length == 0){
                jq('#sector_funding_total').hide();
                jq('#chart-left-bar-chart').html("There are no projects in this sector. <a href='#' onclick='wb.sectorPieChart(\"all\", true);'>back to all sectors</a>");
                return;
            }
            
            if(projects.length == 1){
                jq('#chart-left-pie-chart').html("<br />" + projects[0].project_name + ".<br />There is only a single project in this sector.");
                return;
            }
            
            opts["label_length"] = char_length;
            jq('#sector_funding_total').show();
            jq('#chart-left-pie-chart').show();
            
            if(self.stylelayers["Project Locations"] !== undefined && self.stylelayers["Project Locations"] !== null) {
                opts["href"] = links;
            }
            
            F1.Visualizer.charts.pie(190, width, pie_options, "chart-left-pie-chart", opts);	
            
        },
        
    minesPieChart: function() 
        {
            //jq("#left-chart-title").html("CHARTS COMING SOON")
            var opts = {};
            var labels = ["Corporate income tax","Value added tax","License fees","Windfall tax","Production sharing","Other payments"];
            var companies=[{"id":1,"company_name":"Adil och LLC","registration_number":"2707969","localpay":862,"centralpay":179114.9,"totalpay":179976.9,"corp_inc_tax":252,"vat":46091,"license_fee":67956,"windfall":0,"psa_payment":0,"other_payment":65677.9,},{"id":2,"company_name":"Aduunchuluun LLC","registration_number":"2044239","localpay":14399.5,"centralpay":522128,"totalpay":536527.5,"corp_inc_tax":40298,"vat":235133,"license_fee":78815.5,"windfall":0,"psa_payment":0,"other_payment":182281,},{"id":3,"company_name":"AFC Tavt LLC","registration_number":"5170966","localpay":8186,"centralpay":191761.1,"totalpay":199947.1,"corp_inc_tax":0,"vat":13088,"license_fee":7374,"windfall":27106,"psa_payment":0,"other_payment":152379.1,},{"id":4,"company_name":"Agit Khangai LLC","registration_number":"2597977","localpay":11570,"centralpay":124377,"totalpay":135947,"corp_inc_tax":17259,"vat":0,"license_fee":10693,"windfall":50007,"psa_payment":0,"other_payment":57988,},{"id":5,"company_name":"Altain Khuder LLC","registration_number":"5056721","localpay":62150.1,"centralpay":4133767.2,"totalpay":4195792,"corp_inc_tax":10,"vat":1263879,"license_fee":1032000,"windfall":0,"psa_payment":0,"other_payment":1899903,},{"id":6,"company_name":"Altan Dornod mongol LLC","registration_number":"2112868","localpay":27150.4,"centralpay":342170,"totalpay":369320.4,"corp_inc_tax":0,"vat":0,"license_fee":480,"windfall":0,"psa_payment":0,"other_payment":368840.4,},{"id":7,"company_name":"Amg mining LLC","registration_number":"5176727","localpay":1621.4,"centralpay":289019.8,"totalpay":290641.2,"corp_inc_tax":11436,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":279205.2,},{"id":8,"company_name":"Amin tsetseg LLC","registration_number":"4184165","localpay":672,"centralpay":116516.8,"totalpay":117188.8,"corp_inc_tax":3378,"vat":5,"license_fee":107500,"windfall":0,"psa_payment":0,"other_payment":6305.8,},{"id":9,"company_name":"Andiin elch LLC","registration_number":"5051118","localpay":3375,"centralpay":313826,"totalpay":317201,"corp_inc_tax":305.6,"vat":3906.2,"license_fee":106326.2,"windfall":0,"psa_payment":0,"other_payment":206663,},{"id":10,"company_name":"Andiin temvvlel LLC","registration_number":"5205581","localpay":7839,"centralpay":126898.7,"totalpay":134737.7,"corp_inc_tax":1300,"vat":0,"license_fee":19873.7,"windfall":85614.2,"psa_payment":0,"other_payment":27949.8,},{"id":11,"company_name":"AnKhaiinternational LLC","registration_number":"2863847","localpay":8364.3,"centralpay":1479311.5,"totalpay":1487675.8,"corp_inc_tax":640964,"vat":14253,"license_fee":494996,"windfall":0,"psa_payment":0,"other_payment":337462.8,},{"id":12,"company_name":"AUM LLC","registration_number":"5056721","localpay":40384,"centralpay":3624994.3,"totalpay":3665378.3,"corp_inc_tax":28408,"vat":995,"license_fee":604370,"windfall":2637477,"psa_payment":0,"other_payment":394128.3,},{"id":13,"company_name":"Baga tayan LLC","registration_number":"2099551","localpay":7300,"centralpay":48517,"totalpay":55817,"corp_inc_tax":0,"vat":13113,"license_fee":5157,"windfall":21541,"psa_payment":0,"other_payment":16006,},{"id":14,"company_name":"Bayan airag explo-ration LLC","registration_number":"2708701","localpay":3084.6,"centralpay":437167.6,"totalpay":440252.2,"corp_inc_tax":56709,"vat":28260,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":355283.2,},{"id":15,"company_name":"Bayan erch LLC","registration_number":"5023998","localpay":19964,"centralpay":566895.4,"totalpay":586859.4,"corp_inc_tax":80800,"vat":17966,"license_fee":131166,"windfall":0,"psa_payment":0,"other_payment":356927.4,},{"id":16,"company_name":"Beren group LLC","registration_number":"2063182","localpay":3430,"centralpay":194576.6,"totalpay":198006.6,"corp_inc_tax":0,"vat":34010,"license_fee":22500,"windfall":0,"psa_payment":0,"other_payment":141496.6,},{"id":17,"company_name":"Beren mining LLC","registration_number":"2886219","localpay":18327,"centralpay":67261,"totalpay":85588,"corp_inc_tax":20,"vat":0,"license_fee":22710,"windfall":0,"psa_payment":0,"other_payment":62858,},{"id":18,"company_name":"Berkh Uul LLC","registration_number":"2643928","localpay":10891.8,"centralpay":99799.5,"totalpay":110691.3,"corp_inc_tax":4605,"vat":32680,"license_fee":13921.5,"windfall":25881,"psa_payment":0,"other_payment":33603.8,},{"id":19,"company_name":"Bold tumur eruu gol LLC","registration_number":"2019205","localpay":74239.5,"centralpay":36109943.5,"totalpay":36184183,"corp_inc_tax":6138906,"vat":12081738.5,"license_fee":8827571,"windfall":0,"psa_payment":0,"other_payment":9135967.5,},{"id":20,"company_name":"Boroo gold LLC","registration_number":"2094533","localpay":1155786.8,"centralpay":45231081,"totalpay":46386867.8,"corp_inc_tax":28248926,"vat":1473721,"license_fee":9794443.7,"windfall":849063,"psa_payment":0,"other_payment":6020714.1,},{"id":21,"company_name":"Bud invest LLC","registration_number":"2100754","localpay":6860.5,"centralpay":52380.3,"totalpay":59240.8,"corp_inc_tax":500,"vat":9706,"license_fee":1149.4,"windfall":4688,"psa_payment":0,"other_payment":43197.4,},{"id":22,"company_name":"Bulgan gangat LLC","registration_number":"5091462","localpay":6519,"centralpay":575158.2,"totalpay":581677.2,"corp_inc_tax":0,"vat":0,"license_fee":96376,"windfall":397396,"psa_payment":0,"other_payment":87905.2,},{"id":23,"company_name":"Bumbat LLC","registration_number":"5193443","localpay":20306,"centralpay":165880,"totalpay":186186,"corp_inc_tax":0,"vat":5000,"license_fee":44075,"windfall":0,"psa_payment":0,"other_payment":137111,},{"id":24,"company_name":"Buurgent LLC","registration_number":"2855119","localpay":19767,"centralpay":510520.1,"totalpay":530287.1,"corp_inc_tax":34400,"vat":1482,"license_fee":84624,"windfall":373440,"psa_payment":0,"other_payment":36341.1,},{"id":25,"company_name":"Centerragold Mongolia LLC","registration_number":"2108291","localpay":29492,"centralpay":666881.6,"totalpay":696373.6,"corp_inc_tax":190699,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":505674.6,},{"id":26,"company_name":"Chamin alt LLC","registration_number":"5231337","localpay":4702,"centralpay":156364,"totalpay":161066,"corp_inc_tax":400,"vat":0,"license_fee":24583,"windfall":80752,"psa_payment":0,"other_payment":55331,},{"id":27,"company_name":"ChinKhua mak nariin sukhait LLC","registration_number":"2697947","localpay":119198,"centralpay":10422764.2,"totalpay":10541962.2,"corp_inc_tax":3034752,"vat":318619,"license_fee":2465874,"windfall":0,"psa_payment":0,"other_payment":4722717.2,},{"id":28,"company_name":"Cojigovi LLC","registration_number":"2078449","localpay":3783.1,"centralpay":1684298.6,"totalpay":1688081.7,"corp_inc_tax":0,"vat":143402,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":1544679.7,},{"id":29,"company_name":"Commod LLC","registration_number":"2685841","localpay":7337.9,"centralpay":207977.4,"totalpay":215315.3,"corp_inc_tax":10413,"vat":29638,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":175264.3,},{"id":30,"company_name":"Datsan trade LLC","registration_number":"2061848","localpay":13799,"centralpay":580697.7,"totalpay":591536.8,"corp_inc_tax":37339,"vat":0,"license_fee":74450,"windfall":306063,"psa_payment":0,"other_payment":173684.8,},{"id":31,"company_name":"Dun erdene LLC","registration_number":"2010933","localpay":11030,"centralpay":133558.8,"totalpay":144588.8,"corp_inc_tax":2434,"vat":0,"license_fee":19318,"windfall":86762,"psa_payment":0,"other_payment":36074.8,},{"id":32,"company_name":"Dun Yuan LLC","registration_number":"2724146","localpay":2885,"centralpay":155805.3,"totalpay":158690.3,"corp_inc_tax":0,"vat":12695.4,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":145994.9,},{"id":33,"company_name":"EAM Khukh adar LLC","registration_number":"2844915","localpay":0,"centralpay":94003.6,"totalpay":94003.6,"corp_inc_tax":4482,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":89521.6,},{"id":34,"company_name":"Emeelt mines LLC","registration_number":"2776804","localpay":30475,"centralpay":286578.2,"totalpay":317053.2,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":317053.2,},{"id":35,"company_name":"Energy resourse LLC","registration_number":"2887746","localpay":188898,"centralpay":40249346.8,"totalpay":40438244.8,"corp_inc_tax":13326098,"vat":0,"license_fee":13834561.7,"windfall":0,"psa_payment":0,"other_payment":13277585.1,},{"id":36,"company_name":"Engui tal LLC","registration_number":"2834421","localpay":4934.2,"centralpay":129808,"totalpay":134742.2,"corp_inc_tax":17452,"vat":0,"license_fee":0,"windfall":11237,"psa_payment":0,"other_payment":106053.2,},{"id":37,"company_name":"Erdenes holding LLC","registration_number":"2655772","localpay":45541.7,"centralpay":725306.8,"totalpay":770848.5,"corp_inc_tax":390,"vat":1184.5,"license_fee":0,"windfall":633376,"psa_payment":0,"other_payment":135898,},{"id":38,"company_name":"Erdenes MGL LLC","registration_number":"5124913","localpay":7901.7,"centralpay":12390712.9,"totalpay":12398614.6,"corp_inc_tax":9156527,"vat":11792,"license_fee":3000000,"windfall":0,"psa_payment":0,"other_payment":230295.6,},{"id":39,"company_name":"Erdenet Mining corporation LLC","registration_number":"2074192","localpay":13156328.8,"centralpay":641713324.9,"totalpay":654869653.5,"corp_inc_tax":53420098.2,"vat":15355597,"license_fee":66371429,"windfall":435698454.7,"psa_payment":0,"other_payment":84024074.6,},{"id":40,"company_name":"Eringovi LLC","registration_number":"5026474","localpay":0,"centralpay":95914,"totalpay":95914,"corp_inc_tax":20,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":95894,},{"id":41,"company_name":"Erven Khuder LLC","registration_number":"5069068","localpay":1172,"centralpay":118631.6,"totalpay":119803.6,"corp_inc_tax":0,"vat":2430,"license_fee":46540,"windfall":0,"psa_payment":0,"other_payment":70833.6,},{"id":42,"company_name":"Garrison asia LLC","registration_number":"5122392","localpay":3394,"centralpay":121169.2,"totalpay":124563.2,"corp_inc_tax":0,"vat":26396,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":98167.2,},{"id":43,"company_name":"Gatsuurt LLC","registration_number":"2054701","localpay":112844.1,"centralpay":1969724.9,"totalpay":2082569,"corp_inc_tax":96792,"vat":498090,"license_fee":98934.8,"windfall":471543,"psa_payment":0,"other_payment":917209.2,},{"id":44,"company_name":"Geo-Erel LLC","registration_number":"2046342","localpay":7219,"centralpay":93542.6,"totalpay":100761.6,"corp_inc_tax":500,"vat":364,"license_fee":5437,"windfall":24482,"psa_payment":0,"other_payment":69978.6,},{"id":45,"company_name":"GKMK LLC","registration_number":"5041589","localpay":28074.6,"centralpay":1540701.7,"totalpay":1568776.3,"corp_inc_tax":4904,"vat":0,"license_fee":256300,"windfall":1147578,"psa_payment":0,"other_payment":159994.3,},{"id":46,"company_name":"Golden pogada LLC","registration_number":"5111625","localpay":19815,"centralpay":75234,"totalpay":95049,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":95049,},{"id":47,"company_name":"Govi coal and Energy LLC","registration_number":"2862468","localpay":10525.3,"centralpay":1334541.3,"totalpay":1345066.6,"corp_inc_tax":7500,"vat":0,"license_fee":3402,"windfall":0,"psa_payment":0,"other_payment":1334164.6,},{"id":48,"company_name":"Gun bileg trade LLC","registration_number":"2765853","localpay":153,"centralpay":270333.1,"totalpay":270486.1,"corp_inc_tax":208754,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":61732.1,},{"id":49,"company_name":"Gurvan tukhum LLC","registration_number":"2086166","localpay":21685.3,"centralpay":389707.7,"totalpay":411393,"corp_inc_tax":11815,"vat":0,"license_fee":66521,"windfall":264248,"psa_payment":0,"other_payment":68809,},{"id":50,"company_name":"Ilt gold LLC","registration_number":"5073189","localpay":6690.8,"centralpay":207669.6,"totalpay":214360.4,"corp_inc_tax":511,"vat":0,"license_fee":16266,"windfall":77177,"psa_payment":0,"other_payment":120406.4,},{"id":51,"company_name":"Ivanhoe mines Mongolia Inc /Oyu Tolgoi/","registration_number":"2657457","localpay":1490133.1,"centralpay":106357278.6,"totalpay":107847411.7,"corp_inc_tax":813039,"vat":19858404,"license_fee":0,"windfall":0,"psa_payment":68368000,"other_payment":18807968.7,},{"id":52,"company_name":"Jotoin bajuuna LLC","registration_number":"5089417","localpay":3880,"centralpay":119108.4,"totalpay":122988.4,"corp_inc_tax":561,"vat":0,"license_fee":16806,"windfall":86286,"psa_payment":0,"other_payment":19335.4,},{"id":53,"company_name":"Jump Altd LLC","registration_number":"3738191","localpay":36268.9,"centralpay":2590320.2,"totalpay":2626589.1,"corp_inc_tax":17000,"vat":0,"license_fee":459402,"windfall":1914444,"psa_payment":0,"other_payment":235743.1,},{"id":54,"company_name":"Khan Shijir LLC","registration_number":"2608758","localpay":6712.2,"centralpay":354710,"totalpay":361422.2,"corp_inc_tax":13195,"vat":0,"license_fee":55024,"windfall":240154,"psa_payment":0,"other_payment":53049.2,},{"id":55,"company_name":"Khangad explora-tion LLC","registration_number":"2887134","localpay":38340.5,"centralpay":815260.2,"totalpay":853600.7,"corp_inc_tax":234407,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":619193.7,},{"id":56,"company_name":"Khar tarvagatai LLC","registration_number":"2001454","localpay":2687,"centralpay":120060,"totalpay":122747,"corp_inc_tax":1116,"vat":13000,"license_fee":7460,"windfall":38635,"psa_payment":0,"other_payment":62536,},{"id":57,"company_name":"KHOTY LLC","registration_number":"2763788","localpay":12421,"centralpay":207010.1,"totalpay":219431.1,"corp_inc_tax":8529,"vat":0,"license_fee":29838,"windfall":117699,"psa_payment":0,"other_payment":63365.1,},{"id":58,"company_name":"Khuder erdene LLC","registration_number":"2041391","localpay":12322,"centralpay":76853,"totalpay":89175,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":64546,"psa_payment":0,"other_payment":24629,},{"id":59,"company_name":"Khunan jinlen LLC","registration_number":"2881934","localpay":28075,"centralpay":283012,"totalpay":311087,"corp_inc_tax":0,"vat":5131,"license_fee":28493.9,"windfall":123982,"psa_payment":0,"other_payment":153480.1,},{"id":60,"company_name":"Khunnu resourses LLC","registration_number":"5337232","localpay":407,"centralpay":71378,"totalpay":71785,"corp_inc_tax":50,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":71735,},{"id":61,"company_name":"Khurai LLC","registration_number":"2019086","localpay":16231.6,"centralpay":503037.6,"totalpay":519269.2,"corp_inc_tax":0,"vat":24381,"license_fee":77122,"windfall":327141,"psa_payment":0,"other_payment":90625.2,},{"id":62,"company_name":"Khuusgul LLC","registration_number":"2682869","localpay":9842.2,"centralpay":66437.5,"totalpay":76279.7,"corp_inc_tax":468.1,"vat":0,"license_fee":12293.6,"windfall":46427.8,"psa_payment":0,"other_payment":17090.2,},{"id":63,"company_name":"Lon shenda LLC","registration_number":"5312213","localpay":0,"centralpay":147232.4,"totalpay":147232.4,"corp_inc_tax":50,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":147182.4,},{"id":64,"company_name":"MCS holding LLC","registration_number":"2628236","localpay":363.4,"centralpay":1425699.1,"totalpay":1426062.5,"corp_inc_tax":430908,"vat":421812.6,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":573341.9,},{"id":65,"company_name":"MEC LLC","registration_number":"2579634","localpay":2863,"centralpay":182813,"totalpay":185676,"corp_inc_tax":29512,"vat":49453,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":106711,},{"id":66,"company_name":"MGMK LLC","registration_number":"5211646","localpay":151.4,"centralpay":177328.2,"totalpay":177479.6,"corp_inc_tax":22051,"vat":0,"license_fee":104890,"windfall":0,"psa_payment":0,"other_payment":50538.6,},{"id":67,"company_name":"MOENKO LLC","registration_number":"5141583","localpay":578770,"centralpay":2497536,"totalpay":3076306,"corp_inc_tax":592394,"vat":93449,"license_fee":2560,"windfall":0,"psa_payment":0,"other_payment":2387903,},{"id":68,"company_name":"Mogoin gol LLC","registration_number":"2034859","localpay":9325,"centralpay":149239.8,"totalpay":158564.8,"corp_inc_tax":1000,"vat":58304,"license_fee":22802,"windfall":0,"psa_payment":0,"other_payment":76458.8,},{"id":69,"company_name":"Mon Ajnai LLC","registration_number":"2067544","localpay":2575.5,"centralpay":110678.3,"totalpay":113253.8,"corp_inc_tax":11000,"vat":81549,"license_fee":1500,"windfall":0,"psa_payment":0,"other_payment":19204.8,},{"id":70,"company_name":"Mon polimet LLC","registration_number":"2029278","localpay":170176.9,"centralpay":1343429.1,"totalpay":1513606,"corp_inc_tax":145337,"vat":29501,"license_fee":164362,"windfall":704913,"psa_payment":0,"other_payment":469493,},{"id":71,"company_name":"Mondulaan trade LLC","registration_number":"2554518","localpay":30781.2,"centralpay":1651654,"totalpay":1682435.2,"corp_inc_tax":6713.7,"vat":61598,"license_fee":219019,"windfall":976520,"psa_payment":0,"other_payment":418584.5,},{"id":72,"company_name":"Mongol Alt Mak LLC","registration_number":"2095025","localpay":75548,"centralpay":90208655.6,"totalpay":90284203.6,"corp_inc_tax":56760294.2,"vat":2388065,"license_fee":17373908,"windfall":0,"psa_payment":0,"other_payment":13761936.4,},{"id":73,"company_name":"Mongol Bulgar geo LLC","registration_number":"2550245","localpay":12177,"centralpay":846124.4,"totalpay":858301.4,"corp_inc_tax":7299,"vat":0,"license_fee":136717,"windfall":569816.5,"psa_payment":0,"other_payment":144468.9,},{"id":74,"company_name":"Mongol czekh metal LLC","registration_number":"5051134","localpay":6180,"centralpay":178698.9,"totalpay":184878.9,"corp_inc_tax":6191,"vat":13000,"license_fee":78000,"windfall":0,"psa_payment":0,"other_payment":87687.9,},{"id":75,"company_name":"Mongol rud prom LLC","registration_number":"2825627","localpay":159,"centralpay":108318,"totalpay":108477,"corp_inc_tax":9138,"vat":0,"license_fee":65260,"windfall":0,"psa_payment":0,"other_payment":34079,},{"id":76,"company_name":"Mongolrustsevetment LLC","registration_number":"2550466","localpay":171607.8,"centralpay":9579431.1,"totalpay":9751039,"corp_inc_tax":122133,"vat":1057247,"license_fee":3347217.3,"windfall":1640076,"psa_payment":0,"other_payment":3584365.7,},{"id":77,"company_name":"MOOICO LLC","registration_number":"5198445","localpay":3950.3,"centralpay":1007099,"totalpay":1011049.3,"corp_inc_tax":90,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":1010959.3,},{"id":78,"company_name":"Northwind LLC","registration_number":"5003539","localpay":6610,"centralpay":145205.2,"totalpay":151815.2,"corp_inc_tax":5,"vat":22491,"license_fee":45335,"windfall":0,"psa_payment":0,"other_payment":83984.2,},{"id":79,"company_name":"Noyon gary LLC","registration_number":"5233232","localpay":21837,"centralpay":119261.1,"totalpay":141098.1,"corp_inc_tax":2147,"vat":18325.6,"license_fee":5678,"windfall":55591,"psa_payment":0,"other_payment":59356.5,},{"id":80,"company_name":"NPI LLC","registration_number":"5066417","localpay":689,"centralpay":317631.4,"totalpay":318320.4,"corp_inc_tax":28695.7,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":289624.7,},{"id":81,"company_name":"Ochir Tuv LLC","registration_number":"2031256","localpay":25778.1,"centralpay":1181999,"totalpay":1207777.1,"corp_inc_tax":13875,"vat":594916.4,"license_fee":4436.4,"windfall":0,"psa_payment":0,"other_payment":594549.3,},{"id":82,"company_name":"Ododgold LLC","registration_number":"5180252","localpay":19259.5,"centralpay":1414734,"totalpay":1433993.5,"corp_inc_tax":15942,"vat":0,"license_fee":208845,"windfall":929895,"psa_payment":0,"other_payment":279311.5,},{"id":83,"company_name":"Olon ovoot gold LLC","registration_number":"5099005","localpay":39514,"centralpay":4198436.4,"totalpay":4237950.4,"corp_inc_tax":907,"vat":0,"license_fee":190829,"windfall":2432895,"psa_payment":0,"other_payment":1613319.4,},{"id":84,"company_name":"ONTRE LLC","registration_number":"2705133","localpay":410.5,"centralpay":1542554,"totalpay":1542964.5,"corp_inc_tax":183,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":1542781.5,},{"id":85,"company_name":"Petro Matad LLC","registration_number":"2867095","localpay":1413.8,"centralpay":358972,"totalpay":360385.8,"corp_inc_tax":3571,"vat":1010,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":355804.8,},{"id":86,"company_name":"Pibody winsway resourses LLC","registration_number":"5170672","localpay":9634.8,"centralpay":1259573.2,"totalpay":1271608,"corp_inc_tax":32629,"vat":2197,"license_fee":2042,"windfall":0,"psa_payment":0,"other_payment":1234740,},{"id":87,"company_name":"Sansariin geology Khaiguul LLC","registration_number":"5036933","localpay":0,"centralpay":1003204.6,"totalpay":1003204.6,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":1003204.6,},{"id":88,"company_name":"SBF LLC","registration_number":"5184851","localpay":3024,"centralpay":135500,"totalpay":138524,"corp_inc_tax":10,"vat":0,"license_fee":22594,"windfall":96975,"psa_payment":0,"other_payment":18945,},{"id":89,"company_name":"Shamen LLC","registration_number":"5155436","localpay":88565.8,"centralpay":318185.8,"totalpay":406751.6,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":406751.6,},{"id":90,"company_name":"Shanlun LLC","registration_number":"2784904","localpay":17009,"centralpay":550120.5,"totalpay":567729.5,"corp_inc_tax":25500,"vat":26460,"license_fee":255543,"windfall":0,"psa_payment":0,"other_payment":260226.5,},{"id":91,"company_name":"Shar narst LLC","registration_number":"2618621","localpay":1509.9,"centralpay":113014.6,"totalpay":114524.5,"corp_inc_tax":5,"vat":61761,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":52758.5,},{"id":92,"company_name":"Shariin gol JSC","registration_number":"2050374","localpay":77797.7,"centralpay":1571546.9,"totalpay":1649344.6,"corp_inc_tax":170570.6,"vat":454820,"license_fee":233870.1,"windfall":0,"psa_payment":0,"other_payment":790083.9,},{"id":93,"company_name":"Shijir Alt LLC","registration_number":"2072947","localpay":233834.2,"centralpay":4758234.9,"totalpay":4992069.1,"corp_inc_tax":494538,"vat":158951,"license_fee":644995,"windfall":2847760,"psa_payment":0,"other_payment":845825.1,},{"id":94,"company_name":"Shijir talst LLC","registration_number":"2077601","localpay":1700,"centralpay":876609.2,"totalpay":878309.2,"corp_inc_tax":2979,"vat":0,"license_fee":152349.8,"windfall":701399,"psa_payment":0,"other_payment":21581.39,},{"id":95,"company_name":"Shivee ovoo JSC","registration_number":"2004879","localpay":266789,"centralpay":2366190.4,"totalpay":2632979.4,"corp_inc_tax":105787,"vat":872671,"license_fee":569815,"windfall":0,"psa_payment":0,"other_payment":1084706.4,},{"id":96,"company_name":"South govi sands LLC","registration_number":"5084555","localpay":181104.1,"centralpay":13729708.3,"totalpay":13911052.3,"corp_inc_tax":1981761.5,"vat":355659,"license_fee":4648664.7,"windfall":0,"psa_payment":0,"other_payment":6924967.1,},{"id":97,"company_name":"Taats murun LLC","registration_number":"5113075","localpay":24048.6,"centralpay":293351.5,"totalpay":317400.1,"corp_inc_tax":27134.3,"vat":0,"license_fee":51152.8,"windfall":214877,"psa_payment":0,"other_payment":24236,},{"id":98,"company_name":"Tavantolgoi LLC","registration_number":"2016656","localpay":14833167,"centralpay":50526618.4,"totalpay":65359785.4,"corp_inc_tax":22026461,"vat":9658485,"license_fee":17687164,"windfall":0,"psa_payment":0,"other_payment":15987675.4,},{"id":99,"company_name":"Ten Khun LLC","registration_number":"2839717","localpay":12239,"centralpay":217009,"totalpay":229248,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":229248,},{"id":100,"company_name":"TRAMM LLC","registration_number":"5075602","localpay":0,"centralpay":97715.8,"totalpay":97715.8,"corp_inc_tax":5,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":97710.8,},{"id":101,"company_name":"Tsairt mineral LLC","registration_number":"2548747","localpay":250515.6,"centralpay":34183026.8,"totalpay":34433542.4,"corp_inc_tax":23229110,"vat":466915,"license_fee":9343003,"windfall":0,"psa_payment":0,"other_payment":1394514.4,},{"id":102,"company_name":"Tumen And LLC","registration_number":"2656523","localpay":3046.5,"centralpay":111302,"totalpay":114348.5,"corp_inc_tax":3562,"vat":50829.8,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":59956.7,},{"id":103,"company_name":"Universal copper LLC","registration_number":"2875578","localpay":621.9,"centralpay":244824,"totalpay":245445.9,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":245445.9,},{"id":104,"company_name":"Urmun uul LLC","registration_number":"2617749","localpay":12142,"centralpay":1540356,"totalpay":1552498,"corp_inc_tax":100000,"vat":6556,"license_fee":247306,"windfall":1041296,"psa_payment":0,"other_payment":157340,},{"id":105,"company_name":"Urt Khoshuu LLC","registration_number":"5073642","localpay":97,"centralpay":151096.1,"totalpay":151193.1,"corp_inc_tax":84000,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":67193.1,},{"id":106,"company_name":"Uurt gold LLC","registration_number":"2766868","localpay":22201,"centralpay":177056,"totalpay":199257,"corp_inc_tax":8186,"vat":299,"license_fee":9398,"windfall":104224,"psa_payment":0,"other_payment":77150,},{"id":107,"company_name":"Uyangan LLC","registration_number":"2555468","localpay":9609,"centralpay":174860,"totalpay":184469,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":131670,"psa_payment":0,"other_payment":52799,},{"id":108,"company_name":"Western prostector Mongo-lia LLC","registration_number":"2834812","localpay":135,"centralpay":202125.4,"totalpay":202260.4,"corp_inc_tax":0,"vat":0,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":202260.4,},{"id":109,"company_name":"Zaamariin ikh alti LLC","registration_number":"2670801","localpay":15034.6,"centralpay":470552.6,"totalpay":485587.2,"corp_inc_tax":1025,"vat":0,"license_fee":70399,"windfall":299864,"psa_payment":0,"other_payment":114299.2,},{"id":110,"company_name":"Zaraya holdings LLC","registration_number":"5077834","localpay":1120,"centralpay":852792.5,"totalpay":853912.5,"corp_inc_tax":0,"vat":1234,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":852678.5,},{"id":111,"company_name":"Zon xen u tian LLC","registration_number":"5098297","localpay":54687.4,"centralpay":513444.9,"totalpay":568132.3,"corp_inc_tax":22848.3,"vat":7952.6,"license_fee":0,"windfall":0,"psa_payment":0,"other_payment":537331.4,},{"id":112,"company_name":"Zuriin bulan LLC","registration_number":"2854384","localpay":41219.3,"centralpay":261441.9,"totalpay":302661.2,"corp_inc_tax":6500,"vat":0,"license_fee":25779,"windfall":113902,"psa_payment":0,"other_payment":156480.2,}]
            var mines = [
                         {"id":1,"company_name":"Dun erdene LLC","registration_number":"2010933","soumnamemo":"Баяндун","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"133558.8","localpay":"11030","totalpay":"144588.8","comp_num":"50"},{"id":2,"company_name":"Emeelt mines LLC","registration_number":"2776804","soumnamemo":"Баяндун","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"286578.2","localpay":"30475","totalpay":"317053.2"},{"id":3,"company_name":"Jump Altd LLC","registration_number":"3738191","soumnamemo":"Баяндун","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"2590320.2","localpay":"36268.9","totalpay":"2626589.1"},{"id":4,"company_name":"Khuusgul LLC","registration_number":"2682869","soumnamemo":"Баяндун","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"66437.5","localpay":"9842.2","totalpay":"76279.7"},{"id":5,"company_name":"Aduunchuluun LLC","registration_number":"2044239","soumnamemo":"Баянтүмэн","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"522128","localpay":"14399.5","totalpay":"536527.5"},{"id":6,"company_name":"Western prostector Mongo-lia LLC","registration_number":"2834812","soumnamemo":"Дашбалбар","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"202125.4","localpay":"135","totalpay":"202260.4"},{"id":7,"company_name":"Petro Matad LLC","registration_number":"2867095","soumnamemo":"Матад","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":8,"company_name":"Centerragold Mongolia LLC","registration_number":"2108291","soumnamemo":"Цагаан-Овоо","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"666881.6","localpay":"29492","totalpay":"696373.6"},{"id":9,"company_name":"NPI LLC","registration_number":"5066417","soumnamemo":"Чойбалсан","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"317631.4","localpay":"689","totalpay":"318320.4"},{"id":10,"company_name":"Sansariin geology Khaiguul LLC","registration_number":"5036933","soumnamemo":"Чойбалсан","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"1003204.6","localpay":"0","totalpay":"1003204.6"},{"id":11,"company_name":"Shanlun LLC","registration_number":"2784904","soumnamemo":"Чойбалсан","aimagnamemo":"Дорнод","invest_agree":"Not available","centralpay":"550120.5","localpay":"17009","totalpay":"567729.5"},{"id":12,"company_name":"Engui tal LLC","registration_number":"2834421","soumnamemo":"Сүхбаатар","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"129808","localpay":"4934.2","totalpay":"134742.2"},{"id":13,"company_name":"Erven Khuder LLC","registration_number":"5069068","soumnamemo":"Сүхбаатар","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"118631.6","localpay":"1172","totalpay":"119803.6"},{"id":14,"company_name":"Tsairt mineral LLC","registration_number":"2548747","soumnamemo":"Сүхбаатар","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"34183026.8","localpay":"250515.6","totalpay":"34433542.4"},{"id":15,"company_name":"Garrison asia LLC","registration_number":"5122392","soumnamemo":"Түвшинширээ","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"121169.2","localpay":"3394","totalpay":"124563.2"},{"id":16,"company_name":"Andiin elch LLC","registration_number":"5051118","soumnamemo":"Эрдэнэцагаан","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"313826","localpay":"3375","totalpay":"317201"},{"id":17,"company_name":"Bayan erch LLC","registration_number":"5023998","soumnamemo":"Эрдэнэцагаан","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"566895.4","localpay":"19964","totalpay":"586859.4"},{"id":18,"company_name":"Petro Matad LLC","registration_number":"2867095","soumnamemo":"Эрдэнэцагаан","aimagnamemo":"Сүхбаатар","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":19,"company_name":"Mongol rud prom LLC","registration_number":"2825627","soumnamemo":"Батноров","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"108318","localpay":"159","totalpay":"108477"},{"id":20,"company_name":"Northwind LLC","registration_number":"5003539","soumnamemo":"Галшар","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"145205.2","localpay":"6610","totalpay":"151815.2"},{"id":21,"company_name":"Amin tsetseg LLC","registration_number":"4184165","soumnamemo":"Дархан","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"116516.8","localpay":"672","totalpay":"117188.8"},{"id":22,"company_name":"Mongolrustsevetment LLC","registration_number":"2550466","soumnamemo":"Дархан","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":23,"company_name":"Berkh Uul LLC","registration_number":"2643928","soumnamemo":"Мөрөн","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":24,"company_name":"Geo-Erel LLC","registration_number":"2046342","soumnamemo":"Мөрөн","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"93542.6","localpay":"7219","totalpay":"100761.6"},{"id":25,"company_name":"Berkh Uul LLC","registration_number":"2643928","soumnamemo":"Норовлин","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":26,"company_name":"Datsan trade LLC","registration_number":"2061848","soumnamemo":"Норовлин","aimagnamemo":"Хэнтий","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":27,"company_name":"Noyon gary LLC","registration_number":"5233232","soumnamemo":"Баян","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"119261.1","localpay":"21837","totalpay":"141098.1"},{"id":28,"company_name":"AnKhaiinternational LLC","registration_number":"2863847","soumnamemo":"Баянжаргал","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"1479311.5","localpay":"8364.3","totalpay":"1487675.8"},{"id":29,"company_name":"Mongol czekh metal LLC","registration_number":"5051134","soumnamemo":"Баянцагаан","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"178698.9","localpay":"6180","totalpay":"184878.9"},{"id":30,"company_name":"Gun bileg trade LLC","registration_number":"2765853","soumnamemo":"Борнуур","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"270333.1","localpay":"153","totalpay":"270486.1"},{"id":31,"company_name":"Ten Khun LLC","registration_number":"2839717","soumnamemo":"Жаргалант","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"217009","localpay":"12239","totalpay":"229248"},{"id":32,"company_name":"Altan Dornod mongol LLC","registration_number":"2112868","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"342170","localpay":"27150.4","totalpay":"369320.4"},{"id":33,"company_name":"Bud invest LLC","registration_number":"2100754","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"52380.3","localpay":"6860.5","totalpay":"59240.8"},{"id":34,"company_name":"Bulgan gangat LLC","registration_number":"5091462","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"575158.2","localpay":"6519","totalpay":"581677.2"},{"id":35,"company_name":"Bumbat LLC","registration_number":"5193443","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"165880","localpay":"20306","totalpay":"186186"},{"id":36,"company_name":"GKMK LLC","registration_number":"5041589","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"1540701.7","localpay":"28074.6","totalpay":"1568776.3"},{"id":37,"company_name":"Ilt gold LLC","registration_number":"5073189","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"207669.6","localpay":"6690.8","totalpay":"214360.4"},{"id":38,"company_name":"Jotoin bajuuna LLC","registration_number":"5089417","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"119108.4","localpay":"3880","totalpay":"122988.4"},{"id":39,"company_name":"KHOTY LLC","registration_number":"2763788","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"207010.1","localpay":"12421","totalpay":"219431.1"},{"id":40,"company_name":"Mon polimet LLC","registration_number":"2029278","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":41,"company_name":"Mondulaan trade LLC","registration_number":"2554518","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"1651654","localpay":"30781.2","totalpay":"1682435.2"},{"id":42,"company_name":"Mongolrustsevetment LLC","registration_number":"2550466","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":43,"company_name":"SBF LLC","registration_number":"5184851","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"135500","localpay":"3024","totalpay":"138524"},{"id":44,"company_name":"Shijir Alt LLC","registration_number":"2072947","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":45,"company_name":"Uyangan LLC","registration_number":"2555468","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":46,"company_name":"Zaamariin ikh alti LLC","registration_number":"2670801","soumnamemo":"Заамар","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"470552.6","localpay":"15034.6","totalpay":"485587.2"},{"id":47,"company_name":"Gurvan tukhum LLC","registration_number":"2086166","soumnamemo":"Сэргэлэн","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"389707.7","localpay":"21685.3","totalpay":"411393"},{"id":48,"company_name":"Khuder erdene LLC","registration_number":"2041391","soumnamemo":"Сэргэлэн","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"76853","localpay":"12322","totalpay":"89175"},{"id":49,"company_name":"Taats murun LLC","registration_number":"5113075","soumnamemo":"Сэргэлэн","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"293351.5","localpay":"24048.6","totalpay":"317400.1"},{"id":50,"company_name":"Uurt gold LLC","registration_number":"2766868","soumnamemo":"Сэргэлэн","aimagnamemo":"Төв","invest_agree":"Not available","centralpay":"177056","localpay":"22201","totalpay":"199257"},{"id":51,"company_name":"Shamen LLC","registration_number":"5155436","soumnamemo":"Сүмбэр","aimagnamemo":"Говьсүмбэр","invest_agree":"Not available","centralpay":"318185.8","localpay":"88565.8","totalpay":"406751.6"},{"id":52,"company_name":"Shivee ovoo JSC","registration_number":"2004879","soumnamemo":"Шивээговь","aimagnamemo":"Говьсүмбэр","invest_agree":"Not available","centralpay":"2366190.4","localpay":"266789","totalpay":"2632979.4"},{"id":53,"company_name":"Boroo gold LLC","registration_number":"2094533","soumnamemo":"Баянгол","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"45231081","localpay":"1155786.8","totalpay":"46386867.8"},{"id":54,"company_name":"Buurgent LLC","registration_number":"2855119","soumnamemo":"Баянгол","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"510520.1","localpay":"19767","totalpay":"530287.1"},{"id":55,"company_name":"Shijir talst LLC","registration_number":"2077601","soumnamemo":"Баянгол","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"876609.2","localpay":"1700","totalpay":"878309.2"},{"id":56,"company_name":"Bold tumur eruu gol LLC","registration_number":"2019205","soumnamemo":"Ерөө","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"36109943.5","localpay":"74239.5","totalpay":"36184183"},{"id":57,"company_name":"Chamin alt LLC","registration_number":"5231337","soumnamemo":"Ерөө","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"156364","localpay":"4702","totalpay":"161066"},{"id":58,"company_name":"Khunan jinlen LLC","registration_number":"2881934","soumnamemo":"Ерөө","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"283012","localpay":"28075","totalpay":"311087"},{"id":59,"company_name":"Urt Khoshuu LLC","registration_number":"5073642","soumnamemo":"Ерөө","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"151096.1","localpay":"97","totalpay":"151193.1"},{"id":60,"company_name":"Gatsuurt LLC","registration_number":"2054701","soumnamemo":"Мандал","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":61,"company_name":"Khurai LLC","registration_number":"2019086","soumnamemo":"Орхонтуул","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"503037.6","localpay":"16231.6","totalpay":"519269.2"},{"id":62,"company_name":"Shar narst LLC","registration_number":"2618621","soumnamemo":"Түшиг","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"113014.6","localpay":"1509.9","totalpay":"114524.5"},{"id":63,"company_name":"Erdenes holding LLC","registration_number":"2655772","soumnamemo":"Хүдэр","aimagnamemo":"Сэлэнгэ","invest_agree":"Not available","centralpay":"725306.8","localpay":"45541.7","totalpay":"770848.5"},{"id":64,"company_name":"MEC LLC","registration_number":"2579634","soumnamemo":"Даланжаргалан","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"182813","localpay":"2863","totalpay":"185676"},{"id":65,"company_name":"MGMK LLC","registration_number":"5211646","soumnamemo":"Даланжаргалан","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"177328.2","localpay":"151.4","totalpay":"177479.6"},{"id":66,"company_name":"Mongolrustsevetment LLC","registration_number":"2550466","soumnamemo":"Өргөн","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":67,"company_name":"Zaraya holdings LLC","registration_number":"5077834","soumnamemo":"Өргөн","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":68,"company_name":"Cojigovi LLC","registration_number":"2078449","soumnamemo":"Улаанбадрах","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"1684298.6","localpay":"3783.1","totalpay":"1688081.7"},{"id":69,"company_name":"Zaraya holdings LLC","registration_number":"5077834","soumnamemo":"Улаанбадрах","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":70,"company_name":"Zon xen u tian LLC","registration_number":"5098297","soumnamemo":"Хатанбулаг","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":71,"company_name":"Zaraya holdings LLC","registration_number":"5077834","soumnamemo":"Хөвсгөл","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":72,"company_name":"Commod LLC","registration_number":"2685841","soumnamemo":"Эрдэнэ","aimagnamemo":"Дорноговь","invest_agree":"Not available","centralpay":"207977.4","localpay":"7337.9","totalpay":"215315.3"},{"id":73,"company_name":"Zuriin bulan LLC","registration_number":"2854384","soumnamemo":"Хонгор","aimagnamemo":"Дархан-Уул","invest_agree":"Not available","centralpay":"261441.9","localpay":"41219.3","totalpay":"302661.2"},{"id":74,"company_name":"Baga tayan LLC","registration_number":"2099551","soumnamemo":"Шарынгол","aimagnamemo":"Дархан-Уул","invest_agree":"Not available","centralpay":"48517","localpay":"7300","totalpay":"55817"},{"id":75,"company_name":"Shariin gol JSC","registration_number":"2050374","soumnamemo":"Шарынгол","aimagnamemo":"Дархан-Уул","invest_agree":"Not available","centralpay":"1571546.9","localpay":"77797.7","totalpay":"1649344.6"},{"id":76,"company_name":"MCS holding LLC","registration_number":"2628236","soumnamemo":"Баяндалай","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":77,"company_name":"Khunnu resourses LLC","registration_number":"5337232","soumnamemo":"Баян-Овоо","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"71378","localpay":"407","totalpay":"71785"},{"id":78,"company_name":"Amg mining LLC","registration_number":"5176727","soumnamemo":"Гурвантэс","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"289019.8","localpay":"1621.4","totalpay":"290641.2"},{"id":79,"company_name":"ChinKhua mak nariin sukhait LLC","registration_number":"2697947","soumnamemo":"Гурвантэс","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"10422764.2","localpay":"119198","totalpay":"10541962.2"},{"id":80,"company_name":"MCS holding LLC","registration_number":"2628236","soumnamemo":"Гурвантэс","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":81,"company_name":"Mongol Alt Mak LLC","registration_number":"2095025","soumnamemo":"Гурвантэс","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"90208655.6","localpay":"75548","totalpay":"90284203.6"},{"id":82,"company_name":"South govi sands LLC","registration_number":"5084555","soumnamemo":"Гурвантэс","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"13729708.3","localpay":"181104.1","totalpay":"13911052.3"},{"id":83,"company_name":"Olon ovoot gold LLC","registration_number":"5099005","soumnamemo":"Мандал-Овоо","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"4198436.4","localpay":"39514","totalpay":"4237950.4"},{"id":84,"company_name":"Zon xen u tian LLC","registration_number":"5098297","soumnamemo":"Манлай","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":85,"company_name":"MCS holding LLC","registration_number":"2628236","soumnamemo":"Ноён","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":86,"company_name":"Dun Yuan LLC","registration_number":"2724146","soumnamemo":"Номгон","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"155805.3","localpay":"2885","totalpay":"158690.3"},{"id":87,"company_name":"Ivanhoe mines Mongolia Inc /Oyu Tolgoi/","registration_number":"2657457","soumnamemo":"Ханбогд","aimagnamemo":"Өмнөговь","invest_agree":"Available here","centralpay":"106357278.6","localpay":"1490133.1","totalpay":"107847411.7"},{"id":88,"company_name":"ONTRE LLC","registration_number":"2705133","soumnamemo":"Ханбогд","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"1542554","localpay":"410.5","totalpay":"1542964.5"},{"id":89,"company_name":"Zon xen u tian LLC","registration_number":"5098297","soumnamemo":"Ханбогд","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":90,"company_name":"Khangad explora-tion LLC","registration_number":"2887134","soumnamemo":"Ханхонгор","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"815260.2","localpay":"38340.5","totalpay":"853600.7"},{"id":91,"company_name":"Energy resourse LLC","registration_number":"2887746","soumnamemo":"Цогтцэций","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"40249346.8","localpay":"188898","totalpay":"40438244.8"},{"id":92,"company_name":"Erdenes MGL LLC","registration_number":"5124913","soumnamemo":"Цогтцэций","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"12390712.9","localpay":"7901.7","totalpay":"12398614.6"},{"id":93,"company_name":"Tavantolgoi LLC","registration_number":"2016656","soumnamemo":"Цогтцэций","aimagnamemo":"Өмнөговь","invest_agree":"Not available","centralpay":"50526618.4","localpay":"14833167","totalpay":"65359785.4"},{"id":94,"company_name":"Tumen And LLC","registration_number":"2656523","soumnamemo":"Дэлгэрхангай","aimagnamemo":"Дундговь","invest_agree":"Not available","centralpay":"111302","localpay":"3046.5","totalpay":"114348.5"},{"id":95,"company_name":"Adil och LLC","registration_number":"2707969","soumnamemo":"Өлзийт","aimagnamemo":"Дундговь","invest_agree":"Not available","centralpay":"179114.9","localpay":"862","totalpay":"179976.9"},{"id":96,"company_name":"Golden pogada LLC","registration_number":"5111625","soumnamemo":"Эрдэнэдалай","aimagnamemo":"Дундговь","invest_agree":"Not available","centralpay":"75234","localpay":"19815","totalpay":"95049"},{"id":97,"company_name":"Erdenet Mining corporation LLC","registration_number":"2074192","soumnamemo":"Баян-Өндөр","aimagnamemo":"Орхон","invest_agree":"Not available","centralpay":"641713324.9","localpay":"13156328.8","totalpay":"654869653.5"},{"id":98,"company_name":"Ochir Tuv LLC","registration_number":"2031256","soumnamemo":"Баян-Өндөр","aimagnamemo":"Орхон","invest_agree":"Not available","centralpay":"1181999","localpay":"25778.1","totalpay":"1207777.1"},{"id":99,"company_name":"Gatsuurt LLC","registration_number":"2054701","soumnamemo":"Бат-Өлзий","aimagnamemo":"Өвөрхангай","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":100,"company_name":"Gatsuurt LLC","registration_number":"2054701","soumnamemo":"Нарийнтээл","aimagnamemo":"Өвөрхангай","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":101,"company_name":"Agit Khangai LLC","registration_number":"2597977","soumnamemo":"Уянга","aimagnamemo":"Өвөрхангай","invest_agree":"Not available","centralpay":"124377","localpay":"11570","totalpay":"135947"},{"id":102,"company_name":"AUM LLC","registration_number":"5056721","soumnamemo":"Уянга","aimagnamemo":"Өвөрхангай","invest_agree":"Not available","centralpay":"3624994.3","localpay":"40384","totalpay":"3665378.3"},{"id":103,"company_name":"Mon polimet LLC","registration_number":"2029278","soumnamemo":"Бүрэгхангай","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":104,"company_name":"Shijir Alt LLC","registration_number":"2072947","soumnamemo":"Бүрэгхангай","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":105,"company_name":"Urmun uul LLC","registration_number":"2617749","soumnamemo":"Бүрэгхангай","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"1540356","localpay":"12142","totalpay":"1552498"},{"id":106,"company_name":"Uyangan LLC","registration_number":"2555468","soumnamemo":"Бүрэгхангай","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":107,"company_name":"Pibody winsway resourses LLC","registration_number":"5170672","soumnamemo":"Сайхан","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"1259573.2","localpay":"9634.8","totalpay":"1271608"},{"id":108,"company_name":"AFC Tavt LLC","registration_number":"5170966","soumnamemo":"Тэшиг","aimagnamemo":"Булган","invest_agree":"Not available","centralpay":"191761.1","localpay":"8186","totalpay":"199947.1"},{"id":109,"company_name":"TRAMM LLC","registration_number":"5075602","soumnamemo":"Баянговь","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"97715.8","localpay":"0","totalpay":"97715.8"},{"id":110,"company_name":"Universal copper LLC","registration_number":"2875578","soumnamemo":"Баянговь","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"244824","localpay":"621.9","totalpay":"245445.9"},{"id":111,"company_name":"Andiin temvvlel LLC","registration_number":"5205581","soumnamemo":"Баян-Овоо","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"126898.7","localpay":"7839","totalpay":"134737.7"},{"id":112,"company_name":"Mongol Bulgar geo LLC","registration_number":"2550245","soumnamemo":"Баян-Овоо","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":113,"company_name":"Khan Shijir LLC","registration_number":"2608758","soumnamemo":"Бөмбөгөр","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"354710","localpay":"6712.2","totalpay":"361422.2"},{"id":114,"company_name":"Ododgold LLC","registration_number":"5180252","soumnamemo":"Бөмбөгөр","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":115,"company_name":"Ododgold LLC","registration_number":"5180252","soumnamemo":"Бууцагаан","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":116,"company_name":"Gatsuurt LLC","registration_number":"2054701","soumnamemo":"Галуут","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":117,"company_name":"Mongol Bulgar geo LLC","registration_number":"2550245","soumnamemo":"Галуут","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":118,"company_name":"Govi coal and Energy LLC","registration_number":"2862468","soumnamemo":"Шинэжинст","aimagnamemo":"Баянхонгор","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":119,"company_name":"Beren group LLC","registration_number":"2063182","soumnamemo":"Түвшрүүлэх","aimagnamemo":"Архангай","invest_agree":"Not available","centralpay":"194576.6","localpay":"3430","totalpay":"198006.6"},{"id":120,"company_name":"Beren mining LLC","registration_number":"2886219","soumnamemo":"Түвшрүүлэх","aimagnamemo":"Архангай","invest_agree":"Not available","centralpay":"67261","localpay":"18327","totalpay":"85588"},{"id":121,"company_name":"Mon Ajnai LLC","registration_number":"2067544","soumnamemo":"Бүрэнтогтох","aimagnamemo":"Хөвсгөл","invest_agree":"Not available","centralpay":"110678.3","localpay":"2575.5","totalpay":"113253.8"},{"id":122,"company_name":"Mogoin gol LLC","registration_number":"2034859","soumnamemo":"Цэцэрлэг","aimagnamemo":"Хөвсгөл","invest_agree":"Not available","centralpay":"149239.8","localpay":"9325","totalpay":"158564.8"},{"id":123,"company_name":"Bayan airag explo-ration LLC","registration_number":"2708701","soumnamemo":"Дөрвөлжин","aimagnamemo":"Завхан","invest_agree":"Not available","centralpay":"437167.6","localpay":"3084.6","totalpay":"440252.2"},{"id":124,"company_name":"MOOICO LLC","registration_number":"5198445","soumnamemo":"Алтай","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":125,"company_name":"Eringovi LLC","registration_number":"5026474","soumnamemo":"Бугат","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"95914","localpay":"0","totalpay":"95914"},{"id":126,"company_name":"Lon shenda LLC","registration_number":"5312213","soumnamemo":"Бугат","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"147232.4","localpay":"0","totalpay":"147232.4"},{"id":127,"company_name":"MOOICO LLC","registration_number":"5198445","soumnamemo":"Бугат","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":128,"company_name":"Altain Khuder LLC","registration_number":"5056721","soumnamemo":"Цээл","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"4133767.2","localpay":"62150.1","totalpay":"4195792"},{"id":129,"company_name":"Govi coal and Energy LLC","registration_number":"2862468","soumnamemo":"Чандмань","aimagnamemo":"Говь-Алтай","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":130,"company_name":"EAM Khukh adar LLC","registration_number":"2844915","soumnamemo":"Толбо","aimagnamemo":"Баян-Өлгий","invest_agree":"Not available","centralpay":"94003.6","localpay":"0","totalpay":"94003.6"},{"id":131,"company_name":"MOENKO LLC","registration_number":"5141583","soumnamemo":"Дарви","aimagnamemo":"Ховд","invest_agree":"Not available","centralpay":"2497536","localpay":"578770","totalpay":"3076306"},{"id":132,"company_name":"Datsan trade LLC","registration_number":"2061848","soumnamemo":"Тариалан","aimagnamemo":"Увс","invest_agree":"Not available","centralpay":"0","localpay":"0","totalpay":"0"},{"id":133,"company_name":"Khar tarvagatai LLC","registration_number":"2001454","soumnamemo":"Тариалан","aimagnamemo":"Увс","invest_agree":"Not available","centralpay":"120060","localpay":"2687","totalpay":"122747"}
                             ]
 payment_type = ["corp_inc_tax","vat","license_fee","windfall","psa_payment","other_payment"]
 payment_total={}
 
 jq.each(payment_type, function(j,payment){
         if(payment_total[payment]=== undefined||payment_total[payment]===null){
         payment_total[payment]=0;
         }
         })
            total = 0;
//            jq.each(mines, function(i,mine) {
//                    if(mineral_type[mine["mineral_type"]] === undefined || mineral_type[mine["mineral_type"]] === null) {
//                    mineral_type[mine["mineral_type"]] = 0;
//                    }
//                    mineral_type[mine["mineral_type"]] += mine["Total_company_payments"]
//                    total += mine["Total_company_payments"];
//                    })
 
 
            jq.each(companies, function(i,company) {
                    jq.each(payment_type, function(j,payment){
                            payment_total[payment] += company[payment]
                            total += company[payment]
                            })})

 
 payments = []
            var links = []
            jq.each(payment_total, function(type,amount) {
                    payments.push({"payment_type": type, "total": amount})
                    })
            pie_options = {"features":payments,
                "attributes": {"data":{"name": "Total payment","original_name": "total"},
                    "description":{"name": "Payment type","original_name": "payment_type"},
                    "sort":{"name": "Total payment","original_name": "total"} } };
            
            var colors = ["#ffcc00", "#ff8e3a", "#7a7efe"]
            opts["chart"] = {legend: labels, colors: colors};
            opts["colors"] = colors;
            opts["href"] = links;
            F1.Visualizer.charts.pie(190, 380, pie_options, "chart-left-pie-chart", opts);
            
            jq('#sector_funding_total').hide()
            jq("#sector_funding_total").html(total + " Ghana Cedis of revenue")
            
            var self = this;
            
            var table = '<table id="project-info"><thead><tr>';
            jq.each(["Company name", "Registration number","Soum name","Aimag name", "Investment agreement", "2010 National payments", " 2010 Local payments", "2010 Total payments"], function(index,header) {
                    table += tmpl(table_templates.th, {id: index,header: header});
                    });
            table += "</tr></thead><tbody>"
            
            jq.each(mines, function(index, mine) {
                    mine["even"] = ((index+1) % 2 == 0) ? "row_even" : "row_odd";
                    
                    table += tmpl(table_templates.mine, mine);
                    });
            table += "</tbody></table>"
            jq("#map-table").append(table);
            
            jq("#project-info tr").live("click", function() {
                                        self.highlightCompany("company_name", jq(this).attr("data-project-id"));
                                        });
            jq("#map-table").append("<h1><span>TABLE COMING SOON</span></h1>")
        },
        
    regionFundingBars: function() 
        {
            var self = this;
            var s;
            var features = [];
            var links = [];
            var labels = [];
            var values = []
            var keys = [];
            var regions = {"afr": [-58.21771015263559, -40.06827117611299, 110.1807216852909, 42.91753062543606],
                "eca": [-13.217711665674042, 29.88985052620139, 70.98150425328919, 60.78686190710688],
                "sa": [61.884824871647496, 7.593015725643423, 146.0840407906107, 46.958994928105135],
                "mena": [-13.832946019988025, 12.094811366053843, 70.36626989897519, 49.98771379050206],
                "lac": [-160.8300113899943, -50.196834236747186, 7.56842044793218, 31.477067805569064],
                "eap": [82.62701167423133, -17.08655434162228, 166.82622759319457, 27.26600538926502]}
            for(var key in self.regions){ if(key != "OTHER") {keys.push(key);} }
            
            jq.each(keys.sort(), function(i,s) {
                    features.push({name: s, financing: self.regions[s].financing});
                    values.push(self.regions[s].financing/1000)
                    labels.push(s.wordwrap(8, "\n", false).toLowerCase().capitalize())
                    links.push("javascript:wb.map.setExtent(" + regions[self.regions[s].shortname] + ")");
                    });
            
            jq('#funding_total').hide();
            
            bar_options = {
            ids: labels,
                "features":features, "attributes": {
                    "data":{"name": "Financing Amount $m", "original_name": "financing"},
                    "description":{"name": "Region", "original_name": "name"},
                    "sort":{"name": "Financing Amount $m","original_name": "financing"} } };
            
            jq("#chart-right-graph").html("")
            var r = Raphael("chart-right-graph");
            
            var fin = function () {
                this.flag = r.g.popup(this.bar.x, this.bar.y, "$" + (this.bar.value).toFixed(2) + "b").insertBefore(this);
            }
            var fout = function () {
                this.flag.animate({opacity: 0}, 300, function () {this.remove();});
            }
            r.g.barchart(0, 10, 440, 170, [values], bar_options).hover(fin, fout).click(function(e) {
                                                                                        window.location = links[this.bar.index];
                                                                                        });
            // r.g.axis(x_start, y_start, x_width, from, to, steps, orientation, labels, type, dashsize)
            axis = r.g.axis(37,200,435,null,null,labels.length,2,labels, " ", 0);
            axis.text.attr({font:"12px 'Fontin Sans', Fontin-Sans, sans-serif", fill:"#333", "color": "#333"});
            // axis2 = r.g.axis(35,190,300,0,400,10,1);
            return r;
            // F1.Visualizer.charts.bar(180, 405, bar_options, "chart-right-graph", {href: links, data_label: true, label: function() { return links[this.bar.index]; }});
        },
        
    countryFundingBars: function() 
        {
            var self = this;
            var s;
            var features = [];
            var links = [];
            var values = [];
            var labels = [];
            var max = 0;
            jq.each(self.regions, function(s, region) {
                    features.push({name: s, financing: region.financing.toFixed(2)});
                    values.push(region.financing/1000)
                    labels.push(s)
                    links.push("#" + s);
                    if(region.financing/1000 > max) { max = region.financing/1000 }
                    });
            
            jq('#funding_total').hide();
            bar_options = {
            ids: labels,
                "features":features, "attributes": {
                    "data":{"name": "Financing Amount $m", "original_name": "financing"},
                    "description":{"name": "Country", "original_name": "name"},
                    "sort":{"name": "Financing Amount $m","original_name": "financing"} } };
            
            jq("#chart-right-graph").html("")
            var r = Raphael("chart-right-graph");
            var fin = function () {
                this.flag = r.g.popup(this.bar.x, this.bar.y, labels[this.bar.index] + "\n" + ("$" + this.bar.value.toFixed(2) + "b")).insertBefore(this);
            }
            var fout = function () {
                this.flag.animate({opacity: 0}, 300, function () {this.remove();});
            }
            r.g.barchart(50, 20, 330, 200, [values], bar_options).hover(fin, fout).click(function(e) { window.location = links[this.bar.index];});
            axis2 = r.g.axis(25,200,160,0,max,8,1);
            var xLabel = r.g.text(parseInt(400/2), 210, "Country Funding in Billions");
            xLabel.attr({title: "financing amount in US $ billions", fill:"#555"});
            xLabel.node.id = "preview_xaxis"
        },
        
    projectFundingBars: function() 
        {
            var self = this;
            var s;
            var features = [];
            var links = [];
            var colors = [];
            
            jq.each(self.projects, function(index, project) {
                    features.push(project);
                    links.push( "javascript:wb.highlightProject('" + project["id"] + "','');");
                    var sname = project.mjsector1.toLowerCase().trim();
                    // if(Object.include(self.sector_names, sname) && Object.include(self.sectors, self.sector_names[sname])) {
                    colors.push(self.sectors[self.sector_names[sname]].color);
                    // }
                    });
            
            jq('#funding_total').html("$" + self.total_funding.toFixed(1) + " million");
            
            bar_options = {"features":features, "attributes": {
                "data":{"name": "Financing Amount", "original_name": "totalamt"},
                "description":{"name": "Project", "original_name": "project_name"},
                "sort":{"name": "Total Amount","original_name": "totalamt"} } };
            
            barchart = F1.Visualizer.charts.bar(180, 405, bar_options, "chart-right-graph", {data_label: true, href: links, colors: colors, label: function() {
                                                return links[this.bar.index];
                                                }, onclick: function() {
                                                wb.highlightProject(features[this.bar.index].id, '');;
                                                }});
            
        },	
        
    getLayers: function() 
        {
            var self = this;
            var findlayers = ["Indicators","Population","Infant Mortality", "Number of Physicians", "Number of Households", "Special Protected Areas","Forest", "Unemployment", "Soum Boundaries", "Licenses","EITI","Donations","Company","Company Info","No Data"];
            
            possibleLayers = self.map.getLayers();
            
            var index;
            jq.each(possibleLayers, function(layer) {
                    index = Object.include(findlayers, possibleLayers[layer].title);
                    if(index !== undefined && index !== null){
                    self.stylelayers[findlayers[index]] = {guid: possibleLayers[layer].guid, order: possibleLayers[layer].order, source: possibleLayers[layer].source, sharedLayer: false};
                    if(Object.include(["Infant Mortality", "Population", "Number of Physicians", "Number of Households", "Unemployment"], possibleLayers[layer].title)) {
                    F1.WorldBank.indicators[possibleLayers[layer].title].styles.fill.selectedAttribute = possibleLayers[layer].styles.fill.selectedAttribute;
                    }
                    findlayers.splice(index,1);
                    }	
                    })
            
            if(self.country_attrs["indicators"] !== undefined) {
                // second pass if we missed any
                jq.each(self.country_attrs["indicators"], function(index,layer) {
                        if(self.stylelayers["Indicators"] !== undefined && self.stylelayers[layer] == undefined) {
                        self.stylelayers[layer] = {guid: self.stylelayers["Indicators"].guid, order: self.stylelayers["Indicators"].order, source: self.stylelayers["Indicators"].source, sharedLayer: true};
                        }
                        });
            }
            
            var downloads = {//"Project Locations": "csv",
                "Licenses": "csv",
                "EITI": "csv",
                "Donations" : "csv",
                "Company": "csv",
                "Company": "shapefile",
                "Indicators": "csv",
                "Indicators": "shapefile",
                "Soum Boundaries": "shapefile",
                "Special Protected Areas":"shapefile"
                };
            
            jq("#data_links").html("")
            jq.each(downloads, function(index,download) {
                    if(download == "shapefile")
                    format = "zip";
                    else
                    format = download
                    if(self.stylelayers[index] !== undefined)
                    jq("#data_links").append("<li><a href='http://geocommons.com/overlays/" + self.stylelayers[index].source.replace('finder:','') +"."+format+"'>"+index+" ("+download+")</a></li>");
                    
                    })
        
            return false;
        },
        
    loadProjects: function(dataid) 
        {
            var self = this;
            self.map.addLayer({source:"finder:" + dataid, categoryFilter: {attribute:major_sector_name,categories:self.wbicons}, styles: {opacity: 1.0}, zoomToExtent: true })
            // loadProjects is never called
            
        },
        
    styleMap: function() 
        {
            var self = this;
            log("styleMap", self.stylelayers)
            // icons
            if(self.stylelayers["Project Locations"] !== undefined) {
                self.map.addLayerCategoryFilter(self.stylelayers["Project Locations"].guid, {attribute:major_sector_name,categories:self.wbicons});
            }
            // infowindow
            if(self.stylelayers["Project Locations"] !== undefined) {
                if(self.country == "Development Marketplace") {
                    self.map.setLayerInfoWindow(self.stylelayers["Project Locations"].guid, {title: "$[project title]", subtitle: "$["+major_sector_name+"]", tabs:[{title: "About", type: "text", value:"Project: <a target='_new' href='$[source url]'>$[project title]</a>\nYear Funded: $[approval date]\nFunding Amount:$ $[total amt]\nObjective:\n$[development objective]"}, {title: "Location", type: "text", value: "$[geoname], $[country]\n$[region]"}]});
                } 
                else {
                    self.map.setLayerInfoWindow(self.stylelayers["Project Locations"].guid, {title: "$[project title]", subtitle: "$["+major_sector_name+"]", tabs:[{title: "About", type: "text", value:"Project ID: <a target='_new' href='http://web.worldbank.org/external/projects/main?pagePK=64283627&piPK=73230&theSitePK=40941&menuPK=228424&Projectid=$[project id]'>$[project id]</a>\nProject Name: $[project title]\nSector:$["+major_sector_name+"]\nObjective:\n$[development objective]"}, {title: "Location", type: "text", value: "Province: $[adm1]\nDistrict: $[adm2]\nGeoname: $[geoname]\n\nDescription:\n$[precision description]"},{title:"Results", type: "text", value: "$[results]"}]});
                }
            }
            if(self.stylelayers["Project Counts"] !== undefined) {
                self.map.setLayerInfoWindow(self.stylelayers["Project Counts"].guid, {title: "Activities: $[project count]", subtitle: "$[adm1] $[adm2]", tabs:[{title:"About", type:"text", value: "Counts are determined by the total number of activities working within or at this administrative level."}]});
            }
        },
        
    styleLegend: function() 
        {
            // for embedded maps
            var y = 50;
            var ch = jq("#map-content-hdr2");
            if (ch !== undefined && ch.length == 0) {
                y = 20
            } else if ( this.thematic_area != "m4r") {
                y = 80
            }
            
            this.map.setMapStyle( {legend: { visible: true, bgColor:0x92948C, btnBgColor:0x92948C, btnPlacement:"horizontal", btnFontColor:0xFFFFFF, bgAlpha: 0.7, btnBgAlpha:0.7,offset:{x:0,y:0}}});
            if(!this.embed){
                this.map.setMapStyle( { zoom: { visible: true, expanded: true, bgColor: 0x92948C, authHeight: false, height:100, cornerRadius: 5, offset: {x:15,y:y}}})
            } else {
                this.map.setMapStyle( { zoom: { visible: true, expanded: true, bgColor: 0x92948C, authHeight: false, height:10, cornerRadius: 5, expanded: false, horizontal: true, offset: {x:15,y:50}}})
            }
            
            this.map.setMapStyle( { tooltip: { visible: false } } )
            
            return false;
        },
        
    highlightRegions: function(regions, region_attr) 
        {
            var self = this;
            if(region_attr === undefined || region_attr === null)
                region_attr = "Country_1";
            
            self.map.clearHighlights(0);
            jq.map(regions,function(region) {
                   self.map.addHighlight(0, {expression: "$["+region_attr+"] == '"+region+"'"});
                   });
        },
        
    hideLoading: function() 
        {
            jq("#loading").hide();
            jq(".loaded").show();
        },
        
    hoverWindow: function(layer_index,tooltip) 
        {
            var self = this;
            self.map.setMapStyle({tooltip: {visible: false}})
            if(tooltip != "count") self.map.setLayerTooltip(layer_index,{title: tooltip})
                var infodiv = document.createElement("div");
            infodiv.id = "infodiv";
            infodiv.innerHTML = "<span>Explore the map with your mouse</span>"
            
            var parent = document.getElementById("wb_map");
            parent.insertBefore(infodiv, parent.childNodes[0]);
            wb.map.setCallback("onFeatureHover", function(obj) {
                               // hoverwindow only for projects & countries
                               if(obj.features !== null && obj.features.length != 0 && (obj.features[0]["mjsector 1"] !== undefined || obj.features[0]["project count"] !== undefined)) {
                               var text = ""
                               if(tooltip == "count") {text = obj.features.length + " projects<br />";
                               jq.each(obj.features, function(index,feature) {
                                       if(feature["mjsector 1"] !== undefined && feature["mjsector 1"] !== null)
                                       text += "<img alt='" + feature["mjsector 1"] + "' src='" + self.wbicons[feature["mjsector 1"]] + "' />";
                                       })
                               } else {
                               if(obj.features[0]["project count"] !== undefined && obj.features[0]["project count"] !== null && obj.features[0]["project count"] == 0 ) {
                               text = "There are no active projects in " + obj.features[0]["country"];
                               } else { text = obj.tooltip; }
                               }
                               infodiv.innerHTML = "<span>" + text + "</span>"
                               infodiv.style.opacity = "0.9";
                               infodiv.style.left = (obj.point.x - jq("#infodiv").width() / 2) + "px";
                               infodiv.style.top = (obj.point.y - 55) + "px";
                               } else {
                               // self.map.clearHighlights(layer_index);
                               infodiv.style.opacity = "0";
                               }
                               })
        },
        
    drawCharts: function() 
        {
            var self = this;
            
            if( self.initialized ) { return; }
            log("getting layers")
            self.getLayers(self.map);
            log("Layers got", self.stylelayers)
            self.styleMap(self.map);
            log("Map styled");
            
            if(self.country_attrs.indicators !== undefined && self.stylelayers[self.country_attrs.indicators[0]] !== undefined) {
                log("setting indicator")
                self.setIndicator(self.country_attrs.indicators[0]);
            }
            log("indicator")
            // self.toggleSector("counts_admin1",true);
            count = self.country_attrs["projects_count"];
            if(self.thematic_area == 'm4r'){
                log("toggleSector")
                self.toggleSector("all",true,false);
                jq('#project_count').html(count);
                if(count == 1){
                    jq('#active_projects_header').html("active project working in")
                }
                jq('#activity_count').html(self.country_attrs["locations_count"]);
                if(self.country_attrs["locations_count"] == 1) {
                    jq('#mapped_locations_header').html("mapped location")
                } else if (parseInt(self.country_attrs["locations_count"].replace(",","")) > 500) {
                    self.countryFundingBars()
                }
                log("finish header")
                
                self.hoverWindow(self.stylelayers["Project Locations"], "count");
                
            } else if(self.thematic_area == "extractives_controls") {
                jq('#project_count').html("282,595,781");
                jq('#active_projects_header').html("Ghana Cedis of revenue in")
                jq('#activity_count').html(14);
                jq('#mapped_locations_header').html("mapped locations")
                //self.toggleExtractive("Mines","all", true)
                //self.toggleExtractive("Mineral deposits","all", false)
                //self.toggleExtractive("Oil fields","all", true)
                self.map.setMapStyle( {zoom: { offset: {x:15,y:90}}} )
                //self.setExtractiveIndicator('Mines','Total production','Production',true)
                self.setExtractiveIndicator('Licenses','Production percent','Production, Percent of Soum',true)
                //self.setExtractiveIndicator('Oil wells','Lift total','Production',true)
                //self.map.addLayerCategoryFilter(self.stylelayers["Mines"].guid,F1.WorldBank.extractives["Mines"]["Location"])
                //self.map.addLayerCategoryFilter(self.stylelayers["Mineral deposits"].guid,F1.WorldBank.extractives["Mineral deposits"]["Deposits"])
                self.map.setLayerStyle(self.stylelayers["Special Protected Areas"].guid,F1.WorldBank.extractives["Special Protected Areas"]["Location"])
                //self.map.setLayerStyle(self.stylelayers["Mineral deposits"].guid, F1.WorldBank.extractives["Mineral deposits"]["Deposits"])
                self.minesPieChart()
            }
            self.loadState();
            jq("#map-summary").show();
            
            if(self.projects !== undefined && self.projects !== null && self.projects.length != 0) {
                self.sortProjects(self.projects);
                self.projectTable(self.projects);
                log("sortProjects");
                // self.projectFundingBars();
                self.toggleSector("all", false, false);
                log("sectorPieChart");
            }
            if(self.thematic_area == "m4r") { // for countries & regions
                self.sectorPieChart("all", false);
            }
            
            self.loadState();
            self.hideLoading();
            
            self.initialized = true;
        },
        
    styleWorldMap: function() 
        {
            var self = this;
            log("styleWorldMap")
            jq('#project_count').html(self.country_attrs["projects_count"]);
            jq('#activity_count').html(self.country_attrs["locations_count"]);
            if(self.sectors !== undefined && self.sectors !== null) {
                self.sectorPieChart("all", false);
            }
            if(self.regions !== undefined && self.regions !== null && Object.size(wb.regions) != 0) {
                self.regionFundingBars();
            }
            
            self.hoverWindow(self.map.getLayer(0).guid, "</span><span id='info_country'>$[country]</span><br /><span id='info_count'>$[project count] projects</span><span>")
            self.map.setMapStyle( {infowindow: {visible: false}});
            // self.map.setCallback("onFeatureSelected", function(features){ var country = features.features[0]; window.location = "/" + country.region.toLowerCase() + "/" + country.country.toLowerCase().replace(/\s+/,'-') });
            
            // self.map.setCallback("onFeatureHover", function(feature) { console.log(feature)})
            if(self.country != "World") {
                // self.map.addLayerCategoryFilter(0, {attribute:major_sector_name,categories:self.wbicons});
            } else if (self.country == "World") {
                self.map.setLayerInfoWindow(0, {title: "$[country]", subtitle: "$[project count] projects" , tabs: [{title:"About", type: "text", value: "You can explore the growing list of available project profiles of World Bank activities across the world. $[description]"}]}); }
            // else
            // self.map.setLayerInfoWindow(0, {"title": "$[project title]","subtitle": "$[country]- $[sector1]","tabs": [{"title": "Financing","type": "text","value": "Project ID: \u003Ca target='_new' href='http://web.worldbank.org/external/projects/main?pagePK=64283627\u0026piPK=73230\u0026theSitePK=40941\u0026menuPK=228424\u0026Projectid=$[project id]'\u003E$[project id]\u003C/a\u003E\nProject Name: $[project title]\nSector:$[sector1]\nTotal Amount: $ $[total amt]million"},{"title": "Location","type": "text","value": "Country: $[country]\nProvince: $[adm1]\nDistrict: $[adm2]\nLatitude:$[latitude]\nLongitude:$[longitude]"}]})
            
            self.hideLoading();
        },
        
    loadedMap: function() 
        {
            var self = this;
            self.styleLegend();
            // if(self.country == "Philippines")
            // major_sector_name = "sector1";
            if(self.country != "World" && (self.region != self.country)){
                self.drawCharts();
            } else {
                self.styleWorldMap();
            }
            
            initializeEvents();
            if(this.callback !== undefined && this.callback !== null) {
                this.callback.call(self)
            }
        },
        
    fadeHex: function(hex1, hex2, steps)
        {
            if(hex1.charAt(0) == "#")
                hex1 = hex1.slice(1);
            hex1 = hex1.toUpperCase();
            hex1 = +("0x"+hex1);
            
            if(hex2.charAt(0) == "#")
                hex2 = hex2.slice(1);
            hex2 = hex2.toUpperCase();
            hex2 = +("0x"+hex2);
            
            var newArry = ["#" + hex1.toString(16)];
            var r = hex1 >> 16;
            var g = hex1 >> 8 & 0xFF;
            var b = hex1 & 0xFF;
            var rd = (hex2 >> 16)-r;
            var gd = (hex2 >> 8 & 0xFF)-g;
            var bd = (hex2 & 0xFF)-b;
            //
            steps++;
            for (var i=1; i<steps; i++){
                var ratio = i/steps;
                newArry.push("#" + ((r+rd*ratio)<<16 | (g+gd*ratio)<<8 | (b+bd*ratio)).toString(16));
            }
            newArry.push("#" + hex2.toString(16));
            return newArry;
        },
        
    log: function(obj,msg) {
        // console.log(obj,msg)
    }
        
    }
    // jq("#sall").attr('checked', true);
    
})();  