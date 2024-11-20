"use client"

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bricolage_grotesque } from "@/lib/fonts";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";


export default function SendVerifyCode() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            username: '',
            email: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/send-verify-code', {
                email: data.email,
                username: data.username
            })

            toast.success(response.data.message)
            if (response.data.message === 'You are already verified') {
                return router.replace('/sign-in')
            }
            router.replace(`/verify/${data.username}`);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? 'An error occurred. Please try again.')
            setIsSubmitting(false)
        }
    }
    return (
        <div className={`flex justify-center items-center min-h-screen ${bricolage_grotesque}`}>
            <div className="w-full max-w-xl p-8 space-y-8 rounded-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
                        Fill Your Details
                    </h1>
                    <p className="mb-4">use the same details as you used while sign-up then, We will send you an verify code</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} name="email" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='w-full dark:bg-white dark:hover:bg-gray-200' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Send'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}