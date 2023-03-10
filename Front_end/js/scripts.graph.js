// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}



// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [{
    data: [5260,2386, 2162, 1841, 782, 61]
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    },
  },
  colors: [
    "#246dec",
    "#cc3c43",
    "#367952",
    "#f5b74f",
    "#4f35a1"
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: ["002 ฮาดเเวร์", "003 ซอฟเเวร์", "001 อินเตอร์เน็ต", "006 ระบบโทรศัพท์", "030 อื่นๆ", "008 ฟิงเกอร์สแกน"],
  },
  yaxis: {
    title: {
      text: "จำนวนใบเเจ้งซ่อม"
    }
  }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();


// AREA CHART
var areaChartOptions = {
  series: [{
    name: '002 ฮาดเเวร์',
    data: [31, 40, 28, 51, 42]
  }, {
    name: '003 ซอฟเเวร์',
    data: [11, 32, 45, 32, 55]
  }, {
    name: '001 อินเตอร์เน็ต',
    data: [16, 32, 100, 32, 59]
  }, {
    name: '006 ระบบโทรศัพท์',
    data: [16, 32, 100, 32, 76]
  }, {
    name: '030 อื่นๆ',
    data: [16, 32, 100, 32,88]
  }, {
    name: '008 ฟิงเกอร์สแกน',
    data: [16, 32, 100, 32, 90]
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#246dec",
    "#cc3c43",
    "#367952",
    "#f5b74f",
    "#4f35a1"
  ],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["2560", "2561", "2562", "2563", "2564"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'จำนวน',
      },
    },
    
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();