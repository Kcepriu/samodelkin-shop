"use client";
import { Report, Notify } from "notiflix";

export const showSuccess = (title: string, message: string) => {
  Report.success(title, message, "Okay");
};

export const showFailure = (title: string, message: string) => {
  Report.failure(title, message, "Okay");
};

export const showNotifyFailure = (message: string) => {
  Notify.failure(message);
};
