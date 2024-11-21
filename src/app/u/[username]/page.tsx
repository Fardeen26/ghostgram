'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { toast } from 'sonner';
import { bricolage_grotesque } from '@/lib/fonts';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar).filter(Boolean);
};

const initialMessages: string[] = ["What is one thing you’ve never told anyone but wish you could?", "If you could change one decision in your life, what would it be?", "What is the most unexpected compliment you’ve ever received and why?"];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const [isLoading, setIsLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(initialMessages);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get<ApiResponse>('/api/suggest-messages');
      const messages = parseStringMessages(response.data.message);
      setSuggestedMessages(messages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch suggested messages.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  return (
    <div className={`container mx-auto mt-4 my-8 p-6 rounded max-w-4xl ${bricolage_grotesque}`}>
      <h1 className="text-4xl font-bold mb-10 text-center">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white text-black">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            {isLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !messageContent}
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8 mt-10">
        <Card className="dark:bg-black border-none">
          <CardHeader className="text-center text-2xl font-semibold">
            Click on any message below to select it.
          </CardHeader>
          <CardContent className="flex flex-col space-y-2 max-sm:space-y-4">
            {suggestedMessages.length > 0 ? (
              suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className='w-full text-wrap max-sm:h-16'
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            ) : (
              <p className="text-gray-500">No messages available. Try suggesting some!</p>
            )}
          </CardContent>
        </Card>
        <div className="space-y-2 w-full">
          {isFetching ? (
            <Button disabled className="my-4 w-full text-white bg-blue-700 hover:bg-blue-800">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Suggesting
            </Button>
          ) : (
            <Button
              onClick={fetchSuggestedMessages}
              className="my-4 w-full text-white bg-blue-700 hover:bg-blue-800"
              disabled={isFetching}
            >
              Suggest Messages
            </Button>
          )}
        </div>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4 text-lg max-sm:text-base">Do you also want to Receive Messages?</div>
        <Link href={'/sign-up'}>
          <Button className="w-full">Get Started Now</Button>
        </Link>
      </div>
    </div>
  );
}
