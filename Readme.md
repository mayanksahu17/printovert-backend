# Routes 

http://8080/api/v1/users/login
http://8080/api/v1/users/refresh-token
http://8080/api/v1/users/change-password
http://8080/api/v1/users/login
http://8080/api/v1/users/login
http://8080/api/v1/users/login
http://8080/api/v1/users/login
http://8080/api/v1/users/login



 
router.route('/ 
router.route('/login').post(loginUser)


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




for rgister // Post method
data : 
{
"fullName" : "testuser1",
"email" : "testuser1@gmail.com",
"username" : "user1",
"password" : "user1"
"phoneNumber" : "457855552"
}

for login post method 
{
"email" : "testuser1@gmail.com",
"username" : "user1",
"password" : "user1"
}

to get all images 
http://localhost:8000/api/v1/users/all-image/659963e03ecc5b7cdbbbb860
    // "dev": "nodemon -r dotenv/config --experimental-json-modules src/server.js",
