# Routes 




 
- router.route('/ 
- router.route('/login').post(loginUser)


# secured Routes 
router.route('/logout').post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT,upload.single("coverimage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getCurrentUserProfile)

router.route("/history").get(verifyJWT,getWatchHistory)
').post(loginUser)


// secured Routes 
router.route('/logout').post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT,upload.single("coverimage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getCurrentUserProfile)

router.route("/history").get(verifyJWT,getWatchHistory)



