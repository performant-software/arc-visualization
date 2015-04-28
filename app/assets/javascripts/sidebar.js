/**
 * Get list of results for sidebar
 */
var getSidebarResults = function(node) {
   if ( $("#not-subscriber-msg").is(":visible") ) {
      var right = parseInt($("#sidebar").css("right"), 10);
      if (right == 0) {
         right *= -1;
         $("#sidebar").animate({
            right : "-=250",
         }, 150);
      }
      return;
   }
   var listPageSize = 10;
   var query = "/search?";
   var params = getFacetParams(node);
   listPage = node.listPage;
   if (!listPage) {
      node.listPage = 0;
      listPage = 0;
   }
   if (listPage > 0) {
      params += "&pg=" + listPage;
   }
   params += "&max=10&sidebar=1";
   $("#sidebar .title").text(node.name);
   
   var h = parseInt($("#sidebar").css("height"),10)-47;
   $("#sidebar #content").css("max-height", h+"px");
   $("#sidebar #content").empty();
   
   // append the query/date stuff (true causes date param to be added)
   params = params + getSearchParams("&", true);
   

   $.getJSON(query+params, function(data, textStatus, jqXHR) {
      if (textStatus !== "success") {
         return;
      }
      
      $("#sidebar #content").html(data.html);
      var right = parseInt($("#sidebar").css("right"), 10);
      if (right < 0) {
         right *= -1;
         $("#sidebar").animate({
            right : "+="+right,
         }, 150);
      }

   });
}

var hideSidebar = function() {
   var right = parseInt($("#sidebar").css("right"), 10);
   if (right == 0) {
      right *= -1;
      $("#sidebar").animate({
         right : "-=250",
      }, 150);
   }
}