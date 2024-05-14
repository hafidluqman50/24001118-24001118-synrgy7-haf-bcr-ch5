import multer, {Multer} from 'multer'

const upload: Multer = multer({ 
  storage: multer.memoryStorage(),
  limits:{
      fileSize: 2000000
  }
})

export {
  upload
}