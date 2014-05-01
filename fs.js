var script = document.createElement('script');
script.src = "http://code.jquery.com/jquery-2.1.0.js";
var head = document.getElementsByTagName('head')[0];
head.appendChild(script);

var global = this;
script.onload = function () {

  var $ = jQuery;

  global.getMain = function () {
    var main = $("#yfncsumtab").find("tbody > tr > td > table > tbody")[3];
    return $(main);
  }

  global.getData = function () {
    var main = getMain();
    var summaryMark = ".yfnc_d";
    var summaries = main.find(summaryMark);
    var result = {};
    for (var i = 0 ; i < summaries.length ; i++) {
      var summaryName = $(summaries.get(i)).text().trim();
      var summaryData = {};
      var row = $(summaries.get(i)).parent();
      while ((row = row.next()).find(summaryMark).length == 0 && row.length != 0) {
        var children = row.children()
        var rowName = $(children.get(0)).text().trim();
        var rowData = [];
        if (rowName == "") {
          break;
        }
        for (var j = 0 ; j < children.length ; j++) {
          var child = $(children.get(j));
          rowData.push(child.text());
        }
        summaryData[rowName] = rowData;
      }
      result[summaryName] = summaryData;
    }
    return result;
  }

  global.getHeadLine = function () {
    var main = getMain();
    var headLines = [
      main.children().get(0),
      main.children().get(1)
    ];

    var result = {};
    for (var i = 0 ; i < headLines.length ; i++) {
      var elms = $(headLines[i]).children();
      var name = $(elms.get(0)).text().trim();
      var data = [];
      for (var j = 0; j < elms.length; j++) {
        var elm = $(elms.get(j));
        data.push(elm.text().trim());
      }
      result[name] = data;
    }
    return result;
  }

  global.getSummary = function () {
    var summary = $("#yfi_rt_quote_summary");
    var title = $(summary.find(".title").children().get(0)).text().trim();
    var ticker = summary.find(".time_rtq_ticker").text().trim();
    var content = summary.find(".time_rtq_content").text().trim();
    var time = summary.find(".time_rtq").text().trim();
    return {
      title: title,
      ticker: ticker,
      content: content,
      time: time
    }
  }

};
