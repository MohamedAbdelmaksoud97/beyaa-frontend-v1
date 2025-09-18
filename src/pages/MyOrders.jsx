import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchOrders,
  updateOrderStatus,
  deletePurchase,
} from "@/services/orders";
import MainWrapper from "@/ui/MainWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";

// --- Status Badge Component ---
function StatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    paid: "bg-blue-100 text-blue-800 border-blue-300",
    shipped: "bg-orange-100 text-orange-800 border-orange-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    canceled: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function MyOrders() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const {
    data: orders,
    error,
    isPending,
  } = useQuery({
    queryKey: ["orders", slug],
    queryFn: () => fetchOrders(slug),
  });

  const updateMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", slug]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", slug]);
    },
  });

  if (isPending)
    return (
      <div className="grid h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );

  if (error)
    return (
      <p className="mt-10 text-center text-red-500">
        Failed to load orders: {error.message}
      </p>
    );

  if (!orders || orders.length === 0) {
    return (
      <MainWrapper pageName="My Orders">
        <p className="mt-10 text-center text-gray-500">No orders found.</p>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper pageName="My Orders">
      {/* ✅ Total Orders Count */}
      <div className="mb-6 text-center">
        <p className="text-secondary-900 text-lg font-semibold">
          Total Orders:{" "}
          <span className="text-primary-600">{orders.length}</span>
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="rounded-xl border p-6 shadow-sm transition hover:shadow-md"
          >
            {/* Header Row with Delete */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-secondary-900 text-sm font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>
                <p className="text-xs text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
                <div className="mt-1">
                  <StatusBadge status={order.status} />
                </div>
              </div>

              {/* Trash Icon */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this purchase?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The purchase and all its
                      details will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={() =>
                        deleteMutation.mutate({ slug, orderId: order._id })
                      }
                    >
                      {deleteMutation.isPending
                        ? "Deleting..."
                        : "Delete Purchase"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <CardContent className="space-y-6">
              {/* Totals */}
              <div className="flex items-center justify-between border-b pb-3">
                <p className="text-secondary-900 text-base font-bold">
                  <span className="font-medium text-gray-600">Total:</span> EGP{" "}
                  {Number(order.grandTotal).toLocaleString("en-EG")}
                </p>
                <p className="text-xs text-gray-400">
                  {order.products?.length || 0} items
                </p>
              </div>

              {/* Customer Info */}
              <div className="space-y-1 border-b pb-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {order.customerName}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.customerPhone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.customerAddress}
                </p>
              </div>

              {/* Products */}
              <div>
                <p className="text-secondary-900 mb-2 text-sm font-semibold">
                  Products:
                </p>
                <ul className="space-y-3">
                  {order.products.map((p) => (
                    <li
                      key={p._id}
                      className="rounded-lg border bg-gray-50 p-3 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-secondary-900 font-medium">
                          {p.name}
                        </span>
                        <span className="text-primary-600 text-sm font-semibold">
                          EGP {Number(p.totalPrice).toLocaleString("en-EG")}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 pl-2 text-xs text-gray-600">
                        <p>
                          <span className="font-medium">Quantity:</span>{" "}
                          {p.quantity}
                        </p>
                        {p.size && (
                          <p>
                            <span className="font-medium">Size:</span> {p.size}
                          </p>
                        )}
                        {p.color && (
                          <p className="flex items-center gap-2">
                            <span className="font-medium">Color:</span>
                            <span
                              className="inline-block h-3 w-3 rounded-full border"
                              style={{ backgroundColor: p.color }}
                            ></span>
                            {p.color}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Update */}
              <div className="flex flex-col items-center gap-3 border-t pt-4">
                <Select
                  onValueChange={(value) =>
                    updateMutation.mutate({
                      slug,
                      orderId: order._id,
                      status: value,
                    })
                  }
                  defaultValue={order.status}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() =>
                    updateMutation.mutate({
                      slug,
                      orderId: order._id,
                      status: order.status,
                    })
                  }
                  disabled={updateMutation.isPending}
                  className="w-[200px]"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainWrapper>
  );
}

export default MyOrders;
