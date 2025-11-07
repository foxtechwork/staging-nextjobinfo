import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  areaOfInterest: z.string()
    .min(1, { message: "Please select an area of interest" }),
  whatsappNumber: z.string()
    .trim()
    .regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit WhatsApp number" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const areasOfInterest = [
  "Government Jobs",
  "Banking Jobs",
  "Railway Jobs",
  "Teaching Jobs",
  "Engineering Jobs",
  "SSC Jobs",
  "UPSC Jobs",
  "State Government Jobs",
  "Police/Defence Jobs",
];

export default function SubscribeDialog({ open, onOpenChange }: SubscribeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      areaOfInterest: "",
      whatsappNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('subscriber')
        .insert({
          name: data.name,
          email: data.email,
          area_of_interest: data.areaOfInterest,
          whatsapp_number: data.whatsappNumber,
        });

      if (error) {
        if (error.code === '23505') {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
        return;
      }
      
      toast.success("Successfully subscribed! You'll receive job alerts soon.");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">Subscribe to Job Alerts</DialogTitle>
          <DialogDescription className="text-sm">
            Get the latest job notifications delivered to your inbox and WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      className="text-sm h-9 sm:h-10" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="text-sm h-9 sm:h-10" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Area of Interest</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-sm h-9 sm:h-10">
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px] sm:max-h-[300px]">
                      {areasOfInterest.map((area) => (
                        <SelectItem key={area} value={area} className="text-sm">
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Enter 10-digit WhatsApp number" 
                      className="text-sm h-9 sm:h-10" 
                      maxLength={10}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-9 sm:h-10 text-sm" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
