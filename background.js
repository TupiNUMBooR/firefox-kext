browser.menus.create({
  id: "kext-bm-dwn",
  title: "cp as md",
  contexts: ["bookmark"]
});
browser.menus.create({
  id: "kext-bm-dwn-rm",
  title: "cp as md and rm",
  contexts: ["bookmark"]
});

browser.menus.onClicked.addListener((info) => {
  if (!/kext-bm-dwn/.test(info.menuItemId)) return;
  browser.bookmarks.get(info.bookmarkId).then(b => {
      var t = md(b[0].title, b[0].url);
      navigator.clipboard.writeText(t);
      if (/kext-bm-dwn-rm/.test(info.menuItemId))
        browser.bookmarks.remove(b[0].id);
  });
});

function md(title, url) {
  return `[${title}](${url})`;
}
