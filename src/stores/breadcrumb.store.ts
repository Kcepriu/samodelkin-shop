"use client";

import { create } from "zustand";

interface IBreadcrumb {
  title: string;
  url: string;
}

interface IStateBreadcrumbData {
  breadcrumb: IBreadcrumb[];
}

interface IStateBreadcrumb extends IStateBreadcrumbData {
  setBreadcrumb: (newBreadcrumb: IBreadcrumb[]) => Promise<void>;
}

// * Create Store
const useBreadcrumb = create<IStateBreadcrumb>()((set, get) => ({
  breadcrumb: [],

  setBreadcrumb: async (newBreadcrumb) => {
    return set((state) => ({
      breadcrumb: newBreadcrumb,
    }));
  },
}));

export default useBreadcrumb;
