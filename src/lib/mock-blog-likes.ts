const STORAGE_PREFIX = "ecell-mock-blog-likes:";
const CHANGE_EVENT = "ecell-mock-blog-likes-changed";

export interface MockBlogLikeState {
  liked: boolean;
  likesCount: number;
}

function storageKey(blogId: string): string {
  return `${STORAGE_PREFIX}${blogId}`;
}

function readLikedUserIds(blogId: string): string[] {
  const stored = window.localStorage.getItem(storageKey(blogId));
  if (!stored) {
    return [];
  }

  const value: unknown = JSON.parse(stored);
  if (
    !Array.isArray(value) ||
    !value.every((userId) => typeof userId === "string")
  ) {
    throw new Error("Saved mock blog likes are invalid.");
  }

  return value;
}

export function getMockBlogLikeState(
  blogId: string,
  userId: string | undefined,
  initialLikes: number,
): MockBlogLikeState {
  const likedUserIds = readLikedUserIds(blogId);
  return {
    liked: userId ? likedUserIds.includes(userId) : false,
    likesCount: initialLikes + likedUserIds.length,
  };
}

export function toggleMockBlogLike(
  blogId: string,
  userId: string,
  initialLikes: number,
): MockBlogLikeState {
  const likedUserIds = readLikedUserIds(blogId);
  const userIndex = likedUserIds.indexOf(userId);
  if (userIndex === -1) {
    likedUserIds.push(userId);
  } else {
    likedUserIds.splice(userIndex, 1);
  }

  window.localStorage.setItem(storageKey(blogId), JSON.stringify(likedUserIds));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: blogId }));

  return {
    liked: userIndex === -1,
    likesCount: initialLikes + likedUserIds.length,
  };
}

export function subscribeToMockBlogLikes(
  blogId: string,
  listener: () => void,
): () => void {
  const key = storageKey(blogId);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) {
      listener();
    }
  };
  const handleChange = (event: Event) => {
    if (event instanceof CustomEvent && event.detail === blogId) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, handleChange);
  };
}
