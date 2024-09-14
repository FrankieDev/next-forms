'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Toaster, toast } from 'sonner'

import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Debe tener al menos 5 caracteres.'
  }),
  description: z.string().min(10, {
    message: 'Debe tener al menos 10 caracteres.'
  })
})

interface NewFormProps {
  // Add your props here
  open: boolean
}

const NewForm: React.FC<NewFormProps> = () => {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { name, description } = values

    const response = await fetch('/api/forms', {
      method: 'POST',
      body: JSON.stringify({ name, description })
    })

    const result = await response.json()

    if (!result.success) {
      console.error(result)
      toast.error(result.error, {
        description: `
          ${result.details.map((d: any) => d.message).join(',')}.
        `,
        position: 'top-center'
      })

      return
    }

    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: 'Sonner' }), 2000)
      )

    toast.promise(promise, {
      loading: 'Redirecting...',
      success: (data) => {
        // 3. Redirect the user to the builder
        router.push(`/builder/${result.data.id}`)
        return 'Formulario creado con éxito.'
      },
      error: 'Error',
      position: 'top-center'
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='mb-4 text-slate-700'>
          Crear nuevo formulario
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event?.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Nuevo Formulario</DialogTitle>
          <DialogDescription className='mb-4'>
            Crea un nuevo formulario para tu proyecto.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 pt-5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ingrese el nombre del formulario'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe tu formulario'
                        rows={3}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Enviar</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
      <Toaster expand={false} richColors />
    </Dialog>
  )
}

export default NewForm
