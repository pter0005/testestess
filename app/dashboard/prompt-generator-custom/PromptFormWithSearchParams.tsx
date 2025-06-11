'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react'; // Adicionado import do ícone Rocket
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateVeo3Prompt } from '@/ai/flows/veo3-prompt-generator-flow';
import type { GenerateVeo3PromptInput } from '@/lib/schemas/veo3-prompt-schema';
import { Copy, Wand2 } from 'lucide-react'; // Assuming these icons are needed

interface VideoTypeOption {
    id: string;
    label: string;
    icon: any; // Replace 'any' with the actual icon type if available
}

interface PromptFormWithSearchParamsProps {
    videoTypeOptions: VideoTypeOption[];
}

const formSchema = z.object({
    videoType: z.string({ required_error: 'Por favor, selecione o tipo de vídeo.' }),
    sceneDescription: z.string().min(10, { message: 'Descreva a cena com pelo menos 10 caracteres.' }),
    mainSubjects: z.string().optional(),
    mainActions: z.string().optional(),
    visualStyle: z.string().optional(),
    cameraAngle: z.string().optional(),
    additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PromptFormWithSearchParams: React.FC<PromptFormWithSearchParamsProps> = ({ videoTypeOptions }) => {
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false); // New state for client-side check
    const { toast } = useToast();
    const searchParams = useSearchParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoType: '',
            sceneDescription: '',
            mainSubjects: '',
            mainActions: '',
            visualStyle: '',
            cameraAngle: '',
            additionalDetails: '',
        },
    });

    useEffect(() => {
        if (!searchParams) {
            return;
        }

        const initialValues: Partial<FormValues> = {};
        const videoTypeParam = searchParams.get('videoType');
        const sceneDescriptionParam = searchParams.get('sceneDescription');
        const mainSubjectsParam = searchParams.get('mainSubjects');
        const mainActionsParam = searchParams.get('mainActions');
        const visualStyleParam = searchParams.get('visualStyle');
        const cameraAngleParam = searchParams.get('cameraAngle');
        const additionalDetailsParam = searchParams.get('additionalDetails');

        if (videoTypeParam) initialValues.videoType = videoTypeParam;
        if (sceneDescriptionParam) initialValues.sceneDescription = sceneDescriptionParam;
        if (mainSubjectsParam) initialValues.mainSubjects = mainSubjectsParam;
        if (mainActionsParam) initialValues.mainActions = mainActionsParam;
        if (visualStyleParam) initialValues.visualStyle = visualStyleParam;
        if (cameraAngleParam) initialValues.cameraAngle = cameraAngleParam;
        if (additionalDetailsParam) initialValues.additionalDetails = additionalDetailsParam;

        if (Object.keys(initialValues).length > 0) {
            form.reset(initialValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, form]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        setGeneratedPrompt(null);
        try {
            const result = await generateVeo3Prompt(data as GenerateVeo3PromptInput);
            setGeneratedPrompt(result.generatedPrompt);
            toast({
                title: 'Prompt Gerado!',
                description: 'Seu prompt para Veo 3 está pronto.',
            });
        } catch (error) {
            console.error('Erro ao gerar prompt:', error);
            toast({
                variant: 'destructive',
                title: 'Erro ao Gerar Prompt',
                description: 'Ocorreu um problema ao contatar a IA. Tente novamente.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (generatedPrompt) {
            navigator.clipboard.writeText(generatedPrompt);
            toast({
                title: 'Prompt Copiado!',
                description: 'O prompt foi copiado para a área de transferência.',
            });
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary flex items-center justify-center">
                    <Rocket className="mr-3 h-8 w-8" />
                    Personalize e Gere seu Prompt com IA
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Ajuste os detalhes e deixe nossa IA criar o prompt perfeito para Veo 3!</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">1. Qual o tipo de vídeo? <span className="text-primary">*</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={form.watch('videoType')}
                            onValueChange={(value) => form.setValue('videoType', value, { shouldValidate: true })}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                        >
                            {videoTypeOptions.map((option) => (
                                <Label
                                    key={option.id}
                                    htmlFor={`videoType-custom-${option.id}`}
                                    className="flex items-center space-x-3 p-3 border border-input rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors bg-background/50"
                                >
                                    <RadioGroupItem value={option.id} id={`videoType-custom-${option.id}`} />
                                    <option.icon className="h-5 w-5 text-primary" />
                                    <span>{option.label}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                        {form.formState.errors.videoType && (
                            <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.videoType.message}</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">2. Onde se passa a cena? <span className="text-primary">*</span></CardTitle>
                        <CardDescription>Descreva o lugar, horário, iluminação, atmosfera predominante.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            {...form.register('sceneDescription')}
                            placeholder="Ex: Uma floresta mágica ao entardecer, com raios de sol filtrando pelas árvores e uma névoa misteriosa no chão."
                            className="min-h-[100px] bg-input placeholder-muted-foreground"
                        />
                        {form.formState.errors.sceneDescription && (
                            <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.sceneDescription.message}</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">3. Personagens/Objetos Principais</CardTitle>
                        <CardDescription>Quem ou o quê é o foco principal do vídeo?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            {...form.register('mainSubjects')}
                            placeholder="Ex: Um jovem aventureiro com roupas de explorador, um dragão majestoso, um artefato antigo brilhante."
                            className="bg-input placeholder-muted-foreground"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">4. Ações/Eventos Principais</CardTitle>
                        <CardDescription>O que está acontecendo no vídeo?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            {...form.register('mainActions')}
                            placeholder="Ex: O aventureiro descobre o artefato, o dragão sobrevoa as montanhas, uma perseguição em alta velocidade."
                            className="bg-input placeholder-muted-foreground"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">5. Estilo Visual</CardTitle>
                        <CardDescription>Qual a estética desejada? (cinemático, aquarela, neon, etc.)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            {...form.register('visualStyle')}
                            placeholder="Ex: Cinemático com cores vibrantes, animação 2D estilo retrô, fotografia documental em preto e branco."
                            className="bg-input placeholder-muted-foreground"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">6. Ângulo da Câmera/Composição</CardTitle>
                        <CardDescription>Como a cena deve ser enquadrada?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            {...form.register('cameraAngle')}
                            placeholder="Ex: Close-up no rosto do personagem, tomada aérea mostrando a paisagem, travelling acompanhando o movimento."
                            className="bg-input placeholder-muted-foreground"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/70 backdrop-blur-md border border-border/30 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">7. Detalhes Adicionais</CardTitle>
                        <CardDescription>Qualquer outra informação importante para o prompt.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            {...form.register('additionalDetails')}
                            placeholder="Ex: Efeitos de partículas mágicas, transição suave entre cenas, trilha sonora épica e inspiradora."
                            className="min-h-[100px] bg-input placeholder-muted-foreground"
                        />
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full shine-button bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Wand2 className="mr-2 h-5 w-5 animate-pulse" /> Gerando com IA...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-5 w-5" /> Gerar Prompt Final
                        </>
                    )}
                </Button>
            </form>

            {/* Telinha para o resultado do prompt */}
            <Card className="mt-10 bg-card/80 backdrop-blur-md border-primary/50 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Seu Prompt Gerado:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-input rounded-md text-foreground whitespace-pre-wrap break-words min-h-[100px] flex items-center justify-center">
                        {isLoading ? (
                            <span className="text-muted-foreground italic">Gerando com IA, aguarde...</span>
                        ) : generatedPrompt ? (
                            generatedPrompt
                        ) : (
                            <span className="text-muted-foreground">Seu prompt gerado pela IA aparecerá aqui.</span>
                        )}
                    </div>
                    {generatedPrompt && !isLoading && (
                        <Button onClick={copyToClipboard} variant="outline" className="w-full shine-button">
                            <Copy className="mr-2 h-4 w-4" /> Copiar Prompt
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PromptFormWithSearchParams;