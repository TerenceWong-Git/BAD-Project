import fs from "fs";
import formidable from "formidable";


declare global {
	namespace Express {
	  export interface Request {
		form: {
		  fields: formidable.Fields;
		  files: formidable.Files;
		};
	  }
	}
  }

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
	uploadDir,
	maxFiles: 1,
	maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
	filter: (part) => part.mimetype?.startsWith("image/") || false

});

// const app = express();

// app.post("/contact", (req, res) => {
// 	form.parse(req, (err, fields, files) => {
// 		console.log({ err, fields, files });
// 		res.redirect("/");
// 	});
// });


// export const uploadMiddleware = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
//   ) => {
// 	form.parse(req, async (err, fields, files) => {
// 	  if (err) {
// 		res.status(400).json({ message: "cannot upload file" });
// 		return;
// 	  }
// 	  req.form = { fields, files };
// 	  next();
// 	});
//   };