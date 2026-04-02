import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService.js";

class PostModule {
  constructor() {
    this.form = document.getElementById("postForm");
    this.table = document.querySelector("#postTable tbody");

    this.title = document.getElementById("title");
    this.body = document.getElementById("body");
    this.postId = document.getElementById("postId");

    this.init();
  }

  async init() {
    await this.loadPosts();
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.table.addEventListener("click", (e) => {
      const id = e.target.dataset.id;

      if (e.target.classList.contains("edit")) {
        this.handleEdit(e.target);
      }

      if (e.target.classList.contains("delete")) {
        this.handleDelete(id);
      }
    });
  }

  async loadPosts() {
    const posts = await getPosts();
    console.log("posts", posts);

    this.table.innerHTML = posts
      .map(
        (post) => `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button class="edit btn btn-sm btn-warning"
                        data-id="${post.id}"
                        data-title="${post.title}"
                        data-body="${post.body}">
                        Edit
                    </button>
                    <button class="delete btn btn-sm btn-danger" data-id="${post.id}">
                        Delete
                    </button></div>
                </td>
            </tr>
        `,
      )
      .join("");
  }

  async handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: this.title.value,
      body: this.body.value,
    };

    if (this.postId.value) {
      await updatePost(this.postId.value, data);
    } else {
      await createPost(data);
    }

    this.resetForm();
    this.loadPosts();
  }

  handleEdit(btn) {
    this.postId.value = btn.dataset.id;
    this.title.value = btn.dataset.title;
    this.body.value = btn.dataset.body;
  }

  async handleDelete(id) {
    if (!confirm("Delete this post?")) return;

    await deletePost(id);
    this.loadPosts();
  }

  resetForm() {
    this.form.reset();
    this.postId.value = "";
  }
}
new PostModule();
