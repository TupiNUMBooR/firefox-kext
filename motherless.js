var btn = $("<button/>").text("log links");
$(document.body).prepend(btn);
$(".header-search-form-wrapper").append(btn);
btn.click(() => {
  var links = $("div.thumb-container.video >> a").map((i,a) => $(a).attr("href"));
  var shorts = links.toArray().map(a => a.replace(/.+\//, ""));
  console.log(shorts.join(" "));
});
