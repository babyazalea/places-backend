const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "song's park",
    description: "this is song's park in front of our home.",
    imageUrl:
      "https://www.busaninnews.co.kr/news/photo/201709/2944_7929_2154.jpg",
    address: "부산광역시 부산진구 전포동 전포2동 중앙대로 818",
    location: {
      lat: 35.1641929,
      lng: 129.0643827,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "citizen park",
    description: "this is our favorite park",
    imageUrl:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191227194943122_oen",
    address: "부산광역시 부산진구 범전동 시민공원로 73",
    location: {
      lat: 35.1641962,
      lng: 129.0627412,
    },
    creator: "u2",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }

  res.json({ place });
});

module.exports = router;
