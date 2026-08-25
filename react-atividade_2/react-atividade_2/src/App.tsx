import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Página de agendamento usando componentes prontos do Material UI.
dayjs.locale('pt-br')

const steps = ['Serviço', 'Data e horário', 'Seus dados', 'Confirmação']

const services = [
  { name: 'Corte masculino', duration: '45 min', price: 'R$ 45,00' },
  { name: 'Corte + barba', duration: '60 min', price: 'R$ 65,00' },
  { name: 'Barba', duration: '30 min', price: 'R$ 30,00' },
  { name: 'Corte infantil', duration: '40 min', price: 'R$ 40,00' },
]

const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

interface FormData {
  service: string
  date: Dayjs | null
  time: string
  name: string
  phone: string
  email: string
}

const initialForm: FormData = {
  service: '',
  date: dayjs().add(1, 'day'),
  time: '',
  name: '',
  phone: '',
  email: '',
}

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const selectedService = useMemo(
    () => services.find((service) => service.name === form.service),
    [form.service],
  )

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const validateStep = () => {
    if (activeStep === 0 && !form.service) {
      setError('Escolha um serviço para continuar.')
      return false
    }
    if (activeStep === 1 && (!form.date || !form.time)) {
      setError('Escolha a data e um horário disponível.')
      return false
    }
    if (activeStep === 2 && (!form.name.trim() || !form.phone.trim())) {
      setError('Informe seu nome e telefone para continuar.')
      return false
    }
    return true
  }

  const next = () => {
    if (validateStep()) setActiveStep((step) => step + 1)
  }

  const back = () => {
    setError('')
    setActiveStep((step) => step - 1)
  }

  const confirm = () => {
    setSuccess(true)
    setActiveStep(0)
    setForm(initialForm)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f6f7fb' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#171717' }}>
          <Toolbar sx={{ maxWidth: 1180, width: '100%', mx: 'auto', py: 1 }}>
            <Avatar sx={{ bgcolor: '#f0b90b', color: '#171717', mr: 1.5 }}>
              ✂️
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography>Barber House</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Agendamento online
              </Typography>
            </Box>
            </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 1.4 }}>
              RESERVE SEU HORÁRIO
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 44 }, mt: 0.5 }}>
              Seu próximo corte começa aqui.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
              Escolha o serviço, encontre um horário conveniente e confirme seu atendimento em poucos passos.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 320px' }, gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid #e4e7ec', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {activeStep === 0 && (
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="h5">Escolha o serviço</Typography>
                      <Typography color="text.secondary">Selecione uma opção para ver os horários disponíveis.</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      {services.map((service) => {
                        const selected = form.service === service.name
                        return (
                          <Paper
                            key={service.name}
                            component="button"
                            type="button"
                            onClick={() => update('service', service.name)}
                            elevation={0}
                            sx={{
                              textAlign: 'left', cursor: 'pointer', p: 2.5, borderRadius: 2.5,
                              border: selected ? '2px solid #1976d2' : '1px solid #dfe3e8',
                              bgcolor: selected ? 'rgba(25,118,210,.06)' : '#fff',
                              transition: '.2s', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' },
                            }}
                          >
                            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                              <Avatar sx={{ bgcolor: selected ? 'primary.main' : '#eef1f5', color: selected ? '#fff' : '#56606d' }}>
                                ✂️
                              </Avatar>
                              {selected && <Typography component="span" color="primary">✓</Typography>}
                            </Stack>
                            <Typography sx={{ mt: 2 }}>{service.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{service.duration}</Typography>
                            <Typography sx={{ mt: 1 }}>{service.price}</Typography>
                          </Paper>
                        )
                      })}
                    </Box>
                  </Stack>
                )}

                {activeStep === 1 && (
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h5">Data e horário</Typography>
                      <Typography color="text.secondary">Escolha quando deseja ser atendido.</Typography>
                    </Box>
                    <DatePicker
                      label="Data do atendimento"
                      value={form.date}
                      onChange={(date) => update('date', date)}
                      disablePast
                      format="DD/MM/YYYY"
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    <Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: "center" }}>
                        ◷
                        <Typography>Horários disponíveis</Typography>
                      </Stack>
                      <ToggleButtonGroup
                        value={form.time}
                        exclusive
                        onChange={(_, value) => value && update('time', value)}
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                      >
                        {timeSlots.map((time) => (
                          <ToggleButton key={time} value={time} sx={{ border: '1px solid #dfe3e8 !important', borderRadius: '9px !important', px: 2, py: 1 }}>
                            {time}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Box>
                  </Stack>
                )}

                {activeStep === 2 && (
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="h5">Seus dados</Typography>
                      <Typography color="text.secondary">Precisamos destes dados para confirmar seu atendimento.</Typography>
                    </Box>
                    <TextField label="Nome completo" value={form.name} onChange={(e) => update('name', e.target.value)} fullWidth />
                    <TextField label="Telefone" value={form.phone} onChange={(e) => update('phone', e.target.value)} fullWidth />
                    <TextField label="E-mail (opcional)" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} fullWidth />
                  </Stack>
                )}

                {activeStep === 3 && (
                  <Stack spacing={2.5}>
                    <Box sx={{ textAlign: 'center', py: 1 }}>
                      <Avatar sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'success.main' }}>✓</Avatar>
                      <Typography variant="h5" sx={{ mt: 2 }}>Confira seu agendamento</Typography>
                      <Typography color="text.secondary">Tudo certo? É só confirmar.</Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
                      <Stack spacing={1.5}>
                        <SummaryRow label="Serviço" value={form.service} />
                        <SummaryRow label="Data" value={form.date?.format('dddd, DD [de] MMMM [de] YYYY') ?? '-'} />
                        <SummaryRow label="Horário" value={form.time} />
                        <Divider />
                        <SummaryRow label="Cliente" value={form.name} />
                        <SummaryRow label="Telefone" value={form.phone} />
                      </Stack>
                    </Paper>
                  </Stack>
                )}

                <Divider sx={{ my: 4 }} />
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Button variant="outlined" disabled={activeStep === 0} onClick={back}>Voltar</Button>
                  {activeStep < 3 ? (
                    <Button variant="contained" size="large" onClick={next}>Continuar</Button>
                  ) : (
                    <Button variant="contained" color="success" size="large" onClick={confirm}>Confirmar</Button>
                  )}
                </Stack>
              </CardContent>
            </Card>

            <Stack spacing={2}>
              <Card elevation={0} sx={{ border: '1px solid #e4e7ec', borderRadius: 3 }}>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>Resumo</Typography>
                  <Stack spacing={1.5}>
                    <SummaryRow label="Serviço" value={selectedService?.name ?? 'Não selecionado'} />
                    <SummaryRow label="Data" value={form.date?.format('DD/MM/YYYY') ?? 'Não selecionada'} />
                    <SummaryRow label="Horário" value={form.time || 'Não selecionado'} />
                    {selectedService && <Chip size="small" label={`${selectedService.duration} • ${selectedService.price}`} sx={{ width: 'fit-content', mt: 1 }} />}
                  </Stack>
                </CardContent>
              </Card>

              <Card elevation={0} sx={{ border: '1px solid #e4e7ec', borderRadius: 3 }}>
                <CardContent>
                  <Typography>Barber House</Typography>
                  <Stack spacing={1.3} sx={{ mt: 2 }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: "flex-start" }}>⌖<Typography variant="body2" color="text.secondary">Av. Central, 120 • Centro</Typography></Stack>
                    <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>◷<Typography variant="body2" color="text.secondary">Seg–Sáb • 08:00–18:00</Typography></Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>

        <Snackbar open={success} autoHideDuration={5000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
            Agendamento confirmado com sucesso! Até breve.
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ textAlign: "right" }}>{value}</Typography>
    </Stack>
  )
}

export default App
