"use client";

import Select from "@/app/_components/select";
import { useCallback } from "react";
import { InquiryData } from "./inquiries-table";
import { updateInquiryStatus } from "../actions/actions";
import swal from "sweetalert";

export const Status = ({ inquiry, refetch }: { inquiry: InquiryData, refetch: () => Promise<void> }) => {
  const updateStatus = useCallback(async (status: "PENDING" | "PAID") => {
    try {
      await updateInquiryStatus({ id: inquiry.id, status });
      swal("Success", "Inquiry status updated", "success");
			await refetch()
    } catch (error) {
      console.log(error);
      swal("Error", "Failed to update inquiry status", "error");
    }
  }, [inquiry.id, refetch]);

  return (
    <Select
      name={"Update status"}
      options={[
        { id: "PENDING", name: "Pending" },
        { id: "PAID", name: "Paid" },
      ]}
      value={inquiry.status}
      onChange={(e) => updateStatus(e.target.value as "PENDING" | "PAID")}
			className="w-32"
    />
  );
};
