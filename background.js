// Function to get the first bookmark from the reading list folder
// datasource
async function getFirstBookmark() {
  const bookmarks = await chrome.bookmarks.search({ title: "Reading List" });
  if (bookmarks.length === 0) return null;

  const readingListFolder = bookmarks[0];
  const children = await chrome.bookmarks.getChildren(readingListFolder.id);
  if (children.length === 0) return null;
  return children[0];
}

// todo:: not working
async function moveBookmarkToReadFolder(bookmark) {
  // Search for the "Read" folder
  let readFolders = await chrome.bookmarks.search({ title: "Read" });
  let readFolder;

  if (readFolders.length === 0) {
    // If "Read" folder doesn't exist, create it in the "Other Bookmarks" folder
    readFolder = await chrome.bookmarks.create({
      parentId: "2", // "2" is the ID of "Other Bookmarks"
      title: "Read",
    });
  } else {
    // Use the first "Read" folder found
    readFolder = readFolders[0];
  }

  // Move the bookmark to the "Read" folder
  await chrome.bookmarks.move(bookmark.id, { parentId: readFolder.id });
}

const urlRegex = /(twitter|reddit|youtube)/;
// Listen for web navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  // Check if the URL is one of the social sites & the top level frame 
  // ref: https://github.com/RahulGautamSingh/knight-templar/issues/1
  if (urlRegex.test(details.url) && details.frameType === 'outermost_frame') {
    const bookmark = await getFirstBookmark();

    if (bookmark) {
      // Redirect to the bookmark URL
      chrome.tabs.update(details.tabId, { url: bookmark.url });

      // Remove the bookmark
      await moveBookmarkToReadFolder(bookmark.id);
    }
  }
});
