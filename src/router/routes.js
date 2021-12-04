const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageUsers.vue") },
      { path: "/auth", component: () => import("pages/PageAuth.vue") },
      {
        path: "/chat/:userId",
        name: "chatPage",
        component: () => import("pages/PageChat.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
