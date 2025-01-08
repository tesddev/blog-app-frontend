import usePostDetails from "../../customHooks/usePostDetails.js";
import { useState, useEffect, useContext } from "react";
import { Layout, Card, Spin, List, Typography, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useComment from "../../customHooks/useComment.js";
import useDeleteComment from "../../customHooks/useDeleteComment.js";
import { UserContext } from "../../context/UserContext.jsx";

const { Header, Content } = Layout;

const DetailsPage = () => {
  const { postId } = useParams();
  const { loading: postLoading, fetchPostDetails } = usePostDetails();
  const { loading: deleteLoading, onDeleteComment } = useDeleteComment();
  const { onComment, loading: commentLoading } = useComment();
  const [postDetails, setPostDetails] = useState(null);
  const [newComment, setNewComment] = useState("");
  // const [comments, setComments] = useState([]);
  const { userRole } = useContext(UserContext);

  const loadPostDetails = async () => {
    const details = await fetchPostDetails(postId);
    if (details) {
      setPostDetails(details);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const payload = {
      content: newComment.trim(),
      postId: postId,
    };

    await onComment(payload);
    setNewComment("");
    await loadPostDetails(); // Refetch details from the backend
  };

  const handleDelete = async (commentId) => {
    await onDeleteComment(commentId);
    console.log(`see com id passed ${commentId}`)
    await loadPostDetails(); // Refetch details from the backend
  };
  
  useEffect(() => {
    loadPostDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[postId, fetchPostDetails]);

  if (postLoading || deleteLoading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin tip="Loading, please wait..." />
        </Content>
      </Layout>
    );
  }
  
  {/* Load on appear */}
  if (!postDetails) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin tip="Loading, please wait..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: "#fff", textAlign: "center" }}>
        <h1 className="font-bold text-2xl">{postDetails.title}</h1>
      </Header>

      <Content style={{ margin: "16px" }}>
        {/* Post Details Card */}
        <Card className="max-w-[30rem] w-[90%] mx-auto" style={{ marginBottom: "16px" }}>
          <div
            dangerouslySetInnerHTML={{ __html: postDetails.content }}
            style={{ marginBottom: "24px" }}
          />
        </Card>

        {/* Add Comment Card */}
        <Card className="max-w-[30rem] w-[90%] mx-auto" style={{ marginBottom: "16px" }}>
          <Typography.Title level={4}>Add a Comment</Typography.Title>
          <Input.TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            style={{ marginBottom: "8px" }}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            loading={commentLoading}
          >
            Comment
          </Button>
        </Card>
        <Card className="max-w-[30rem] w-[90%] mx-auto">
          <Typography.Title level={4}>Comments</Typography.Title>
          <List
            dataSource={postDetails.comments}
            renderItem={(comment) => (
              <List.Item
                actions={
                  userRole === "Admin"
                    ? [
                        <DeleteOutlined
                          key="delete"
                          onClick={() => handleDelete(comment.comentId)}
                          style={{ color: "red", cursor: "pointer" }}
                          loading={deleteLoading}
                        />,
                      ]
                    : []
                }
              >
              <List.Item.Meta
                  title={<strong>{comment.userName || "Anonymous"}</strong>}
                  description={comment.content}
                />
              </List.Item>
            )}
          />
        </Card>

      </Content>
    </Layout>
  );
};

export default DetailsPage;