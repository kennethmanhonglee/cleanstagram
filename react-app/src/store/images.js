const LOAD_IMAGES = "images/LOAD_IMAGES";
const ADD_IMAGE = "images/ADD_IMAGE";
const GET_IMAGE = "images/GET_IMAGE";
const EDIT_IMAGE = "images/EDIT_IMAGE";
const DEL_IMAGE = "images/DEL_IMAGE";
const DISPLAY_LIKED = "images/DISPLAY_LIKED";
const DISLIKE_IMAGE = "images/DISLIKE_IMAGE";
const LIKE_IMAGE = "images/LIKE_IMAGE";

const load_images = (images) => {
  return {
    type: LOAD_IMAGES,
    payload: images,
  };
};

const add = (image) => ({
  type: ADD_IMAGE,
  payload: image,
});

const get = (image) => ({
  type: GET_IMAGE,
  payload: image,
});

const del = (image) => ({
  type: DEL_IMAGE,
  payload: image,
});

const edit = (image) => ({
  type: EDIT_IMAGE,
  payload: image,
});

const displayLikeStatus = (likeStatus) => {
  return {
    type: DISPLAY_LIKED,
    payload: likeStatus,
  };
};

export const loadImages = () => async (dispatch) => {
  const res = await fetch("/api/images");
  if (res.ok) {
    const allImages = await res.json();
    await dispatch(load_images(allImages));
  }
};
const displayLike = (imageId) => ({
  type: LIKE_IMAGE,
  payload: imageId,
});

const displayDislike = (imageId) => ({
  type: DISLIKE_IMAGE,
  payload: imageId,
});

export const likeImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}/like`, {
    method: "POST",
  });

  if (res.ok) {
    const like = await res.json();
    dispatch(displayLike(like.image_id));
  }
};

export const dislikeImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}/dislike`, {
    method: "DELETE",
  });

  if (res.ok) {
    const dislike = await res.json();
    dispatch(displayDislike(dislike.image_id));
  }
};

export const addImage = (formData) => async (dispatch) => {
  const res = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const new_image = await res.json();
    dispatch(add(new_image));

    return { ok: true, id: new_image.id };
  } else {
    const response = await res.json();
    return { ok: false, errors: response.errors };
  }
};

export const getImageById = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`);

  if (res.ok) {
    const query = await res.json();
    dispatch(get(query));
  }
};

export const deleteImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const query = await res.json();
    dispatch(del(query));
    return { ok: true };
  }
};

export const updateCaption = (data) => async (dispatch) => {
  const res = await fetch(`/api/images/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.caption),
  });

  if (res.ok) {
    const query = await res.json();
    dispatch(edit(query));
    return { ok: true };
  }
};

export const checkLikeStatus = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}/is-liked`);

  if (res.ok) {
    const status = await res.json();
    status.id = imageId;
    dispatch(displayLikeStatus(status));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_IMAGES:
      Object.entries(action.payload).forEach(([id, image]) => {
        newState[id] = image;
      });
      return newState;
    case ADD_IMAGE:
      newState[action.payload.id] = action.payload;
      newState.currentImage = action.payload; //refactor later
      return newState;
    case GET_IMAGE:
      newState.currentImage = action.payload;
      newState[action.payload.id] = action.payload;
      return newState;
    case DEL_IMAGE:
      delete newState["currentImage"];
      return newState;
    case EDIT_IMAGE:
      newState["currentImage"]["caption"] = action.payload.caption;
      return newState;
    case DISPLAY_LIKED:
      newState[action.payload.id].isLiked = action.payload.isLiked;
      return newState;
    case DISLIKE_IMAGE:
      newState[action.payload].isLiked = false;
      newState[action.payload].likes_count <= 0
        ? (newState[action.payload].likes_count = 0)
        : newState[action.payload].likes_count--;
      return newState;
    case LIKE_IMAGE:
      newState[action.payload].isLiked = true;
      newState[action.payload].likes_count++;
      return newState;
    default:
      return state;
  }
}
