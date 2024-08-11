// Function to get the first bookmark from the reading list folder
async function getFirstBookmark() {
  const allBookmarks = chrome.bookmarks;
  console.log("All Bookmarks: ", allBookmarks);
  // todo::docs: will this work on edge since its a chromium based browser
  const bookmarks = await chrome.bookmarks.search({ title: "Reading List" });
  console.log("Bookmarks with title: Reading List", bookmarks);
  if (bookmarks.length === 0) return null;

  const readingListFolder = bookmarks[0];
  console.log("Reading List Bookmarks: ", readingListFolder);
  const children = await chrome.bookmarks.getChildren(readingListFolder.id);
  console.log(children);
  if (children.length === 0) return null;
  return children[0];
}

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
  // Check if the URL is twitter.com
  if (urlRegex.test(details.url)) {
    const bookmark = await getFirstBookmark();

    if (bookmark) {
      // Redirect to the bookmark URL
      chrome.tabs.update(details.tabId, { url: bookmark.url });

      // Remove the bookmark
      await moveBookmarkToReadFolder(bookmark.id);
    }
  }
});
