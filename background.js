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

browser.menus.onClicked.addListener(async (info) => {
  if (!/kext-bm-dwn/.test(info.menuItemId)) return;
  var bs = await browser.bookmarks.get(info.bookmarkId);
  var t = await bookmarksToMd(bs);
  // t = t.slice(0,-1);
  navigator.clipboard.writeText(t);
  if (/kext-bm-dwn-rm/.test(info.menuItemId))
    browser.bookmarks.remove(info.bookmarkId);
});

async function bookmarksToMd(bs) {
  var t = "";
  for (const b of bs) {
    if (b.type != "folder") {
      t += md(b.title, b.url) + "\n";
    } else {
      var bs2 = await browser.bookmarks.getChildren(b.id);
      t += await bookmarksToMd(bs2);
    }  
  }
  return t;
}

function md(title, url) {
  return `[${title}](${url})`;
}
