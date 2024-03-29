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
 
    F1.WorldBank.prototype = {
    
    init: function(map_id, country, region, country_attrs, embed, callback) 
        {
            var self = this;
            this.activities = {};
            this.projects = country_attrs.projects;
            this.companies=country_attrs.companies;
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
 var visibility =layervisible[self.stylelayers[layer].order].visible;
 
 var visibility2 =layervisible[self.stylelayers[offlayer].order].visible;
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
                
                var style = F1.WorldBank.extractives[indicator].styles;
                if (indicator!="Soum Boundaries") {
                    style.source = self.stylelayers[indicator].source;
                    if (self.current_indicator="Soum Boundaries"){
                        self.map.showLayer(self.stylelayers[indicator].guid,false);
                    }
                }
                
                if(self.stylelayers[indicator].sharedLayer)
                    self.map.setLayerStyle(self.stylelayers[indicator].guid, style);
                
                var infotabs = [];
                if(F1.WorldBank.extractives[indicator].table !== undefined && F1.WorldBank.extractives[indicator].table !== null)
                    infotabs.push({title: "Data", type:"table", value:F1.WorldBank.extractives[indicator].table})
                    if(F1.WorldBank.extractives[indicator].description !== undefined && F1.WorldBank.extractives[indicator].description !== null)
                        infotabs.push({title: "About", type: "text", value:F1.WorldBank.extractives[indicator].description})
                        var infosub = F1.WorldBank.extractives[indicator].subtitle;
                if(F1.WorldBank.extractives[indicator].infosubtitle !== undefined && F1.WorldBank.extractives[indicator].infosubtitle !== null)
                    infosub = F1.WorldBank.extractives[indicator].infosubtitle
                    
                  try {
                        self.map.setLayerInfoWindow(self.stylelayers[indicator].guid, {title: indicator + ": $["+ F1.WorldBank.extractives[indicator].styles.fill.selectedAttribute +"]", subtitle: infosub, tabs:infotabs});
                        
                        self.map.setLayerTitle(self.stylelayers[indicator].guid, F1.WorldBank.extractives[indicator].title);
                        self.map.setLayerSubTitle(self.stylelayers[indicator].guid, F1.WorldBank.extractives[indicator].subtitle);
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
            this.map.addHighlight(self.stylelayers["Company"].guid,{expression: highlightExpression});
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
        
    minesPieChart: function(data)
        {
            var opts = {};
            var labels = ["Corporate income tax","Value added tax","License fees","Windfall tax","Production sharing","Other payments"];
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
 
 
            jq.each(data, function(i,company) {
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
            
            var colors = ["#B84C02", "#FE9929", "#FEE281", "#D0D1E6", "#909FC2", "#44637B"]
            opts["chart"] = {legend: labels, colors: colors};
            opts["colors"] = colors;
            opts["href"] = links;
            F1.Visualizer.charts.pie(190, 380, pie_options, "chart-left-pie-chart", opts);
            
            jq("#sector_funding_total").html(Math.round(total/100)/10 + " million ₮ in total")
            
            var self = this;
            
            var table = '<table id="project-info"><thead><tr>';
            jq.each(["Company name", "Registration number","Location (if given)", "Investment agreement", "2010 National payments", " 2010 Local payments", "2010 Total payments"], function(index,header) {
                    table += tmpl(table_templates.th, {id: index,header: header});
                    });
            table += "</tr></thead><tbody>"
            
            jq.each(data, function(index, company) {
                    company["even"] = ((index+1) % 2 == 0) ? "row_even" : "row_odd";
                    
                    table += tmpl(table_templates.company, company);
                    });
            table += "</tbody></table>"
            jq("#map-table").append(table);
            
            jq("#project-info tr").live("click", function() {
                                        self.highlightCompany("comp_num", jq(this).attr("data-project-id"));
                                        });
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
                    F1.WorldBank.extractives[possibleLayers[layer].title].styles.fill.selectedAttribute = possibleLayers[layer].styles.fill.selectedAttribute;
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
                "Indicators": "csv",
                "Soum Boundaries": "shapefile",
                "Special Protected Areas":"shapefile",
                "Forest":"shapefile"
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
                jq('#project_count').html("112");
                jq('#active_projects_header').html("companies mapped to")
                jq('#activity_count').html(74);
                jq('#mapped_locations_header').html("soums")
                self.map.setMapStyle( {zoom: { offset: {x:15,y:90}}} )
                self.setExtractiveIndicator('Licenses','Production percent','Production, Percent of Soum',true)
                self.minesPieChart(self.companies)
            }
            self.loadState();
            jq("#map-summary").show();
            
            if(self.projects !== undefined && self.projects !== null && self.projects.length != 0) {
                self.sortProjects(self.projects);
                self.projectTable(self.projects);
                log("sortProjects");
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