var $$ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: "160419131 UTS", // App name
  theme: "auto", // Automatic theme detection
  el: "#app", // App root element

  id: "io.framework7.myapp", // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,
  initOnDeviceReady: true,
  view: {
    stackPages: true,
  },

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

app.request.post(
  "http://ubaya.fun/hybrid/160419131/getnews.php",
  function (data) {
    var arr = JSON.parse(data);
    data_db = arr["data"];
    for (i = 0; i < data_db.length; i++) {
      if (i < 5) {
        $$("#i" + (i + 1)).append(
          '<a href="/newsDetail/' +
            data_db[i]["id"] +
            '"><div style="background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(' +
            data_db[i]["photo"] +
            '); height:100%; justify-content:center;" class="card-header align-items-flex-end"><span style="color:white; font-size:120%; font-weight:bold; padding-bottom:7px;">' +
            data_db[i]["title"] +
            "</span></div>" +
            '<div class="card-content card-content-padding">' +
            "</div>" +
            "</div></a>"
        );
      } else {
        $$("#listNewsHome").append(
          '<li class="accordion-item"><a class="item-content item-link" href="#">' +
            '<div class="item-media"><img src="' +
            data_db[i]["photo"] +
            '" width="80" style="max-height:60px;"/></div>' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title">' +
            data_db[i]["title"] +
            "</div>" +
            "</div>" +
            '<div class="item-subtitle" style="color:grey;">' +
            data_db[i]["date"] +
            "</div>" +
            "</div>" +
            "</a>" +
            '<div class="accordion-item-content">' +
            '<div class="block">' +
            '<div class="item-text">' +
            data_db[i]["content"] +
            "</div>" +
            "</div>" +
            '<a href="/newsDetail/' +
            data_db[i]["id"] +
            '"class="button col">Read More...</a>' +
            "</div>" +
            "</li>"
        );
      }
    }
  }
);

$$(document).on("page:init", function (e, page) {
  if (page.name == "categoriesPage") {
    app.request.post(
      "http://ubaya.fun/hybrid/160419131/getnews.php",
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        for (i = 0; i < data_db.length; i++) {
          if (i < 5) {
            $$("#i" + (i + 1)).append(
              '<a href="/newsDetail/' +
                data_db[i]["id"] +
                '"><div style="background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(' +
                data_db[i]["photo"] +
                '); height:100%; justify-content:center;" class="card-header align-items-flex-end"><span style="color:white; font-size:120%; font-weight:bold; padding-bottom:7px;">' +
                data_db[i]["title"] +
                "</span></div>" +
                '<div class="card-content card-content-padding">' +
                "</div>" +
                "</div></a>"
            );
          } else {
            $$("#listNewsHome").append(
              "<li>" +
                '<a href="/newsDetail/' +
                data_db[i]["id"] +
                '" class="item-link item-content">' +
                '<div class="item-media">' +
                '<img src="' +
                data_db[i]["photo"] +
                '" width="80"/>' +
                "</div>" +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">' +
                data_db[i]["title"] +
                "</div>" +
                '<div class="item-after"></div>' +
                "</div>" +
                '<div class="item-subtitle">' +
                data_db[i]["date"] +
                "</div>" +
                '<div class="item-text">' +
                data_db[i]["content"] +
                "</div>" +
                "</div>" +
                "</a>" +
                "</li>"
            );
          }
        }
      }
    );
  }

  if (page.name == "categoriesPage") {
    app.request.post(
      "http://ubaya.fun/hybrid/160419131/categories.php",
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        for (i = 0; i < data_db.length; i++) {
          $$("#contentCP").append(
            '<div class="block">' +
              '<a href="/newsOnCategory/' +
              data_db[i]["id"] +
              '">' +
              '<button class="button button-fill button-raised">' +
              data_db[i]["name"] +
              "</button>" +
              "</a>" +
              "</div>"
          );
        }
      }
    );
  }

  if (page.name == "newsOnCategoryPage") {
    var categoryId = page.router.currentRoute.params.id;

    app.request.post(
      "http://ubaya.fun/hybrid/160419131/getnews.php",
      { categoryid: categoryId },
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        $$("#title").append(data_db[0]["categoryname"]);
        for (i = 0; i < data_db.length; i++) {
          $$("#contentNCP").append(
            "<div class='col-50'><div class='card'>" +
              "<div class='card-header'>" +
              data_db[i]["title"] +
              "</div><div class='card-content'>" +
              "<img src='" +
              data_db[i]["photo"] +
              "' width='100%'>" +
              "</div><div class='card-footer'>" +
              '<div class="toolbar-inner">' +
              '<a href="#" class="link"></a>' +
              "<a href='/newsDetail/" +
              data_db[i]["id"] +
              "' class='col button button-outline right '>Read More</a>" +
              "</div>" +
              "</div></div></div>"
          );
        }
      }
    );
  }

  if (page.name == "insertPage") {
    app.request.post(
      "http://ubaya.fun/hybrid/160419131/categories.php",
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        $$("#sel_category").append("<option>-- Pilih Category --</option>");
        for (i = 0; i < data_db.length; i++) {
          $$("#sel_category").append(
            "<option value='" +
              data_db[i]["id"] +
              "'>" +
              data_db[i]["name"] +
              "</option>"
          );
        }
      }
    );

    $$("#btnsubmit").on("click", function () {
      var t = $$("#tx_title").val();
      var a = $$("#tx_author").val();
      var d = new Date();
      dateFormated =
        d.getFullYear() +
        "-" +
        d.getDay() +
        "-" +
        d.getMonth() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      var c = $$("#tx_content").val();
      var p = $$("#tx_photo").val();
      var cid = $$("#sel_category").val();
      app.request.post(
        "http://ubaya.fun/hybrid/160419131/insertnews.php",
        {
          title: t,
          author: a,
          date: dateFormated,
          content: c,
          photo: p,
          categoryid: cid,
        },
        function (data) {
          var arr = JSON.parse(data);
          var result = arr["result"];
          if (result == "success") {
            app.dialog.alert("Sukses tambah data");
            app.view.main.router.navigate("/newsDetail/" + arr["id"], {
              reloadCurrent: true,
              pushState: false,
            });
          } else {
            app.dialog.alert("Gagal tambah data");
          }
        }
      );
    });
  }

  if (page.name == "newsDetailPage") {
    var newsId = page.router.currentRoute.params.id;

    app.request.post(
      "http://ubaya.fun/hybrid/160419131/getnews.php",
      { newsid: newsId },
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        for (i = 0; i < data_db.length; i++) {
          $$("#contentND").append(
            '<div class="block">' +
              '<div class="card demo-facebook-card">' +
              '<div class="card-header">' +
              '<div class="demo-facebook-name">' +
              data_db[i]["title"] +
              ' <br> <span style="font-size: 75%; color: gray;">' +
              data_db[i]["date"] +
              "</span></div>" +
              "</div>" +
              '<div class="card-content card-content-padding">' +
              '<img src="' +
              data_db[i]["photo"] +
              '" width="100%" />' +
              '<p style="text-align: justify;">' +
              data_db[i]["content"] +
              "</p>" +
              "</div>" +
              '<div class="card-footer">' +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>"
          );
        }
      }
    );
  }

  if (page.name == "editPage") {
    app.request.post(
      "http://ubaya.fun/hybrid/160419131/getnews.php",
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        for (i = 0; i < data_db.length; i++) {
          $$("#ul_listnews").append(
            "<li>" +
              '<div class="item-content">' +
              '<div class="item-media"><img src="' +
              data_db[i]["photo"] +
              '" width="44"  style="vertical-align: middle; max-height:30px;" /></div>' +
              '<div class="item-inner">' +
              '<a href="/editDetail/' +
              data_db[i]["id"] +
              '"><div class="item-title-row">' +
              '<div class="item-title">' +
              data_db[i]["title"] +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div></a>" +
              "</li>"
          );
        }
      }
    );

    $$("#btncari").on("click", function () {
      $$("#ul_listnews").html("");
      app.request.post(
        "http://ubaya.fun/hybrid/160419131/getnews.php",
        { cari: $$("#txtcari").val() },
        function (data) {
          var arr = JSON.parse(data);
          data_db = arr["data"];
          for (i = 0; i < data_db.length; i++) {
            $$("#ul_listnews").append(
              "<li>" +
                '<div class="item-content">' +
                '<div class="item-media"><img src="' +
                data_db[i]["photo"] +
                '" width="44"  style="vertical-align: middle;" /></div>' +
                '<div class="item-inner">' +
                '<a href="/editDetail/' +
                data_db[i]["id"] +
                '"><div class="item-title-row">' +
                '<div class="item-title">' +
                data_db[i]["title"] +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div></a>" +
                "</li>"
            );
          }
        }
      );
    });
  }

  if (page.name == "editDetail") {
    var newsId = page.router.currentRoute.params.id;

    app.request.post(
      "http://ubaya.fun/hybrid/160419131/categories.php",
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        $$("#sel_category").append("<option>-- Pilih Category --</option>");
        for (i = 0; i < data_db.length; i++) {
          $$("#sel_category").append(
            "<option value='" +
              data_db[i]["id"] +
              "'>" +
              data_db[i]["name"] +
              "</option>"
          );
        }
      }
    );

    app.request.post(
      "http://ubaya.fun/hybrid/160419131/getnews.php",
      { newsid: newsId },
      function (data) {
        var arr = JSON.parse(data);
        data_db = arr["data"];
        $$("#tx_title").val(data_db[0]["title"]);
        $$("#tx_author").val(data_db[0]["author"]);
        $$("#tx_content").val(data_db[0]["content"]);
        $$("#tx_photo").val(data_db[0]["photo"]);
        $$("#sel_category").val(data_db[0]["categories_id"]);
      }
    );

    $$("#btnsubmit").on("click", function () {
      app.request.post(
        "http://ubaya.fun/hybrid/160419131/editnews.php",
        {
          title: $$("#tx_title").val(),
          author: $$("#tx_author").val(),
          content: $$("#tx_content").val(),
          photo: $$("#tx_photo").val(),
          categoryid: $$("#sel_category").val(),
          newsid: newsId,
        },
        function (data) {
          var arr = JSON.parse(data);
          var result = arr["result"];
          if (result == "success") app.dialog.alert("Sukses update data");
          else app.dialog.alert("Gagal update data");
        }
      );
    });

    $$("#btndelete").on("click", function () {
      app.request.post(
        "http://ubaya.fun/hybrid/160419131/deletenews.php",
        {
          newsid: newsId,
        },
        function (data) {
          var arr = JSON.parse(data);
          var result = arr["result"];
          if (result == "success") {
            app.dialog.alert("Sukses menghapus data");
            app.view.main.router.navigate("/editPage", {
              reloadCurrent: true,
              pushState: false,
            });
          } else app.dialog.alert("Gagal menghapus data");
        }
      );
    });
  }
});
