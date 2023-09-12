import multer from 'multer'
import mnb from '../asset'

export const image = async(req,res,next)=>{


    const storageEngine = multer.diskStorage({
        destination: function (req, file, cb) {
          // 接收到文件后输出的保存路径（若不存在则需要创建）
          cb(null, uploadFolder);
        },
        filename: function (req, file, cb) {
          // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
          cb(null, file.originalname);
        }
       })

       const upload = multer({ storage: storageEngine });



}

export default upload