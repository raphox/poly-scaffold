import * as React from "react";
import { GalleryVerticalEnd, Blocks } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Poly Scaffold",
      logo: GalleryVerticalEnd,
      plan: "Documentation v.1.0",
    },
  ],
  navMain: [
    {
      title: "Resources",
      url: "#",
      icon: Blocks,
      items: [
        {
          title: "Pages",
          url: "/pages",
        },
      ],
    },
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "/docs/getting-started#installation",
        },
        {
          title: "Options",
          url: "/docs/getting-started#options",
        },
      ],
    },
    {
      title: "Backend",
      url: "#",
      items: [
        {
          title: "API RESTful",
          url: "/docs/backend",
        },
        {
          title: "Ruby on Rails",
          url: "/docs/backend-ruby-on-rails",
        },
        {
          title: "Django",
          url: "/docs/backend-django",
        },
        {
          title: "Laravel",
          url: "/docs/backend-laravel",
        },
        {
          title: "Express.js",
          url: "/docs/backend-express",
        },
      ],
    },
    {
      title: "Frontend",
      url: "#",
      items: [
        {
          title: "Frameworks",
          url: "/docs/frontend",
        },
        {
          title: "Next.js",
          url: "/docs/frontend-nextjs",
        },
        {
          title: "Next.js + Shadcn",
          url: "/docs/frontend-nextjs#shadcn",
        },
        {
          title: "Nuxt.js",
          url: "/docs/frontend-nuxt",
        },
        {
          title: "Nuxt.js + Shadcn",
          url: "/docs/frontend-nuxt#shadcn",
        },
      ],
    },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Axios",
          url: "/docs/features#axios",
        },
        {
          title: "Form Validation",
          url: "/docs/features#form-validation",
        },
        {
          title: "React Query",
          url: "/docs/features#react-query",
        },
      ],
    },
    {
      title: "Contributing",
      url: "#",
      items: [
        {
          title: "Improviments",
          url: "/docs/contributing#improments",
        },
        {
          title: "New Frameworks",
          url: "/docs/contributing#new-frameworks",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
