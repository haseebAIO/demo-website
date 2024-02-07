import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

//otf, ttf, woff, woff2

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  fontUploaderttf: f({ "font/ttf" : { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Completed for userId:", metadata.userId);

      console.log("file name:", file.name);
      console.log("file url:", file.url);

      return { uploadedBy: metadata.userId };
    }),

    fontUploaderotf: f({ "font/otf" : { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Completed for userId:", metadata.userId);

      console.log("file name:", file.name);
      console.log("file url:", file.url);

      return { uploadedBy: metadata.userId };
    }),

    fontUploaderwoff: f({ "font/woff" : { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Completed for userId:", metadata.userId);

      console.log("file name:", file.name);
      console.log("file url:", file.url);

      return { uploadedBy: metadata.userId };
    }),

    fontUploaderwoff2: f({ "font/woff2" : { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Completed for userId:", metadata.userId);

      console.log("file name:", file.name);
      console.log("file url:", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
