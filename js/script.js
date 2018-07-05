queue()
        .defer(d3.json, "data/gpdata.json")
        .await(makeGraphs);
        
    function makeGraphs(error, gpdata) {
        var ndx = crossfilter(gpdata);
    
    
        
        show_year_selector(ndx);
        show_gender_selector(ndx);
        show_province_selector(ndx);
        show_county_selector(ndx);
        
        
        gender_data_pie(ndx);   
        by_province(ndx);
        by_year(ndx);
        by_month(ndx);




        dc.renderAll();
         }
         
         
         
         
   




         
         
         

 function show_year_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('year'));
    var group = dim.group();
    
    dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(group);
}         


function show_gender_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
    
    dc.selectMenu("#gender-selector")
        .dimension(dim)
        .group(group);
}        


function show_province_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('province'));
    var group = dim.group();
    
    dc.selectMenu("#province-selector")
        .dimension(dim)
        .group(group);
}        


function show_county_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('county'));
    var group = dim.group();
    
    dc.selectMenu("#county-selector")
        .dimension(dim)
        .group(group);
}

        
        
        
       
               

        function gender_data_pie(ndx){
            var name_dim = ndx.dimension(dc.pluck('gender'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
            
             dc.pieChart('#gender_data_pie')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(home_goals)
                .colors(d3.scale.ordinal().range([ "#ffccff", "#b3b3ff" ]));
                
            }
        

        
        

        function by_province(ndx){
            var name_dim = ndx.dimension(dc.pluck('province'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
        
             dc.pieChart('#province_data_pie')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(home_goals)
                .colors(d3.scale.ordinal().range(["#bbff99","#ffff99","#ffb3b3","#b3ccff"]));
            }
        
        
        
        
        function by_year(ndx){
            var name_dim = ndx.dimension(dc.pluck('year'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
        
        dc.barChart("#year_data_barchart")
            .width(500)
            .height(200)
            .margins({top: 10, right: 50, bottom: 30, left: 100})
            .dimension(name_dim)
            .group(home_goals)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Year")
            .yAxis().ticks(6);
        }
        

                function by_month(ndx){
            var name_dim = ndx.dimension(dc.pluck('month'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
        
        dc.barChart("#month_data_barchart")
            .width(500)
            .height(200)
            .margins({top: 10, right: 50, bottom: 30, left: 100})
            .dimension(name_dim)
            .group(home_goals)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Year")
            .yAxis().ticks(6)
            
        }
        
