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
      plan: "Documentation v1.0.0",
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
          url: "/docs/1#Getting+Started/Installation",
        },
        {
          title: "Options",
          url: "/docs/1#Getting+Started/Options",
        },
      ],
    },
    {
      title: "Backend",
      url: "#",
      items: [
        {
          title: "API RESTful",
          url: "/docs/2#Backend/API+RESTful",
        },
        {
          title: "Ruby on Rails",
          url: "/docs/3#Backend/Ruby+on+Rails",
        },
        {
          title: "Django",
          url: "/docs/4#Backend/Django",
        },
        {
          title: "Laravel",
          url: "/docs/5#Backend/Laravel",
        },
        {
          title: "Express.js",
          url: "/docs/6#Backend/Express.js",
        },
      ],
    },
    {
      title: "Frontend",
      url: "#",
      items: [
        {
          title: "Frameworks",
          url: "/docs/7#Frontend/Frameworks",
        },
        {
          title: "Next.js",
          url: "/docs/8#Frontend/Next.js",
        },
        {
          title: "Next.js + Shadcn",
          url: "/docs/8#Frontend/Next.js+and+Shadcn",
        },
        {
          title: "Nuxt.js",
          url: "/docs/9#Frontend/Nuxt.js",
        },
        {
          title: "Nuxt.js + Shadcn",
          url: "/docs/9#Frontend/Nuxt.js+and+Shadcn",
        },
      ],
    },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Axios",
          url: "/docs/10#Features/Axios",
        },
        {
          title: "Form Validation",
          url: "/docs/10#Features/Form-Validation",
        },
        {
          title: "React Query",
          url: "/docs/10#Features/React-Query",
        },
      ],
    },
    {
      title: "Contributing",
      url: "#",
      items: [
        {
          title: "Improviments",
          url: "/docs/11#Contributing/Improviments",
        },
        {
          title: "New Frameworks",
          url: "/docs/11#Contributing/New+Frameworks",
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
