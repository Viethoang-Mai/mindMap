import { getSession } from "@auth0/nextjs-auth0";
import { v4 as uuidv4 } from "uuid";
import ToId from "./ToId";
import { postMindMap } from "@/utils/mindMapFetch";

export async function getServerSideProps(context) {
    try {
        const session = await getSession(context.req, context.res);
        if (!session || !session.user) {
            return {
                redirect: {
                    destination: "/api/auth/login",
                    permanent: false,
                },
            };
        }

        const userId = session.user.sub;
        const idMap = uuidv4();
        const title = "Mind Map chưa có tên";
        const description = "Chưa có mô tả";
        const createdAt = new Date().toLocaleString();
        const checkStatus = "public";
        const type = "textUpdater";
        const data = {};

        // Tạo một bản đồ mới
        const newMindMap = {
            idMap,
            title,
            createdAt,
            data,
            description,
            checkStatus,
            type,
        };

        // Gọi hàm post để lưu bản đồ mới
        await postMindMap([newMindMap], userId);

        // Trả về idMap dưới dạng props để sử dụng trong trang
        return {
            props: {
                idMap,
            },
        };
    } catch (error) {
        console.error("Error creating mind map:", error);
        return {
            props: {
                error: "Error creating mind map. Please try again later.",
            },
        };
    }
}

function CreatePage({ idMap, error }) {
    if (error) {
        return <div>{error}</div>;
    }

    // Chuyển hướng đến trang của bản đồ mới
    return <ToId id={idMap} />;
}

export default CreatePage;
