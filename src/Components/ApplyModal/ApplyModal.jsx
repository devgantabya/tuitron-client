import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../UI/Dialog";
import { Button } from "../UI/Button";
import { Textarea } from "../UI/Textarea";
import { Label } from "../UI/Label";

const ApplyModal = ({ tuition, onClose, open }) => {
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosSecure.post("/applications", {
        tuitionId: tuition._id,
        message,
      });

      if (res.data?.success) {
        alert("Application submitted successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Apply for Tuition</DialogTitle>
          <DialogDescription>
            Review the details before submitting your application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs font-semibold text-primary">Subject</p>
              <p className="mt-1 text-sm text-foreground">{tuition.subject}</p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs font-semibold text-primary">Salary</p>
              <p className="mt-1 text-sm text-foreground">
                {tuition.salary} TK
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs font-semibold text-primary">Days</p>
              <p className="mt-1 text-sm text-foreground">{tuition.days}</p>
            </div>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message for Guardian</Label>
              <Textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly introduce yourself and your experience..."
                className="min-h-[120px]"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Applying..." : "Apply Now"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
