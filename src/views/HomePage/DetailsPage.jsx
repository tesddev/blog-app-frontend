import usePostDetails from "../../customHooks/usePostDetails.js";
import { useState, useEffect } from "react";
import { Layout, Card, Spin, List, Typography, Button, Input } from "antd";
import { useParams } from "react-router-dom";

const { Header, Content } = Layout;
const DetailsPage = () => {
  const { postId } = useParams();
  const { loading, fetchPostDetails } = usePostDetails();
  const [postDetails, setPostDetails] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentData = {
      userName: "Current User",
      content: newComment.trim(),
    };
    setComments([newCommentData, ...comments]);
    setNewComment("");
  };

  useEffect(() => {
    const loadPostDetails = async () => {
      const details = await fetchPostDetails(postId);
      if (details) {
        setPostDetails(details);
        setComments(details.comments || []);
      }
    };

    loadPostDetails();
  }, [postId, fetchPostDetails]);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "16px" }}>
          <Spin tip="Loading post details..." />
        </Content>
      </Layout>
    );
  }

  if (!postDetails) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ margin: "16px" }}>
          <p>Post details could not be loaded.</p>
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
          <Button type="primary" onClick={handleAddComment}>
            Comment
          </Button>
        </Card>
  
        {/* Comments List Card */}
        <Card className="max-w-[30rem] w-[90%] mx-auto">
          <Typography.Title level={4}>Comments</Typography.Title>
          <List
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item>
                <List.Item.Meta
                  title={<strong>{comment.userName}</strong>}
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

