import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  CreditCard,
  HeartPulse,
  Home,
  MessageSquareText,
  MoreHorizontal,
  Phone,
  Plus,
  Star,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  Zap,
} from 'lucide-react'
import './App.css'

type TabKey = 'dashboard' | 'bookings' | 'clients' | 'more'
type CourtFilter = 'All Courts' | 'Court 1' | 'Court 2' | 'Court 3' | 'Court 4'

type Booking = {
  start: string
  end: string
  court: CourtFilter
  players: string
  status: 'Confirmed' | 'Check-in' | 'Pending'
  tone: 'green' | 'lime' | 'coral'
}

type Client = {
  name: string
  lastPlayed: string
  action: 'call' | 'message'
  loyalty: number
}

const bookings: Booking[] = [
  {
    start: '09:00',
    end: '10:30',
    court: 'Court 1',
    players: 'L. Martin, S. Ortega, P. Ruiz, J. Diaz',
    status: 'Confirmed',
    tone: 'green',
  },
  {
    start: '11:00',
    end: '12:30',
    court: 'Court 2',
    players: 'A. Johnson, M. Lee, T. Park, R. Kim',
    status: 'Check-in',
    tone: 'lime',
  },
  {
    start: '13:00',
    end: '14:30',
    court: 'Court 3',
    players: 'Open Play',
    status: 'Pending',
    tone: 'coral',
  },
  {
    start: '15:00',
    end: '16:30',
    court: 'Court 4',
    players: 'J. Smith, C. Brown, D. Wilson, M. Taylor',
    status: 'Confirmed',
    tone: 'green',
  },
]

const clients: Client[] = [
  { name: 'Emma Garcia', lastPlayed: 'Played 3 weeks ago', action: 'call', loyalty: 8 },
  { name: "Liam O'Connor", lastPlayed: 'Played 2 weeks ago', action: 'message', loyalty: 6 },
  { name: 'Sofia Rossi', lastPlayed: 'Played 1 month ago', action: 'call', loyalty: 9 },
  { name: 'Noah Andersson', lastPlayed: 'Played 1 month ago', action: 'message', loyalty: 5 },
]

const reminders = [
  { icon: CalendarDays, title: 'Court 2 in 30 min', detail: '11:00 - 12:30' },
  { icon: UsersRound, title: '3 bookings need check-in', detail: 'Tap to review' },
  { icon: CreditCard, title: 'Payment pending', detail: '2 bookings' },
]

const stats = [
  { label: "Today's Revenue", value: '€1,240', detail: '+18% vs yesterday', icon: TrendingUp },
  { label: 'Bookings', value: '28', detail: '6 remaining', icon: CalendarDays },
  { label: 'Players', value: '96', detail: 'Checked in', icon: UsersRound },
  { label: 'Occupancy', value: '74%', detail: 'Court time today', icon: Activity },
]

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'bookings', label: 'Bookings', icon: CalendarDays },
  { key: 'new', label: 'New Booking', icon: Plus },
  { key: 'clients', label: 'Clients', icon: UsersRound },
  { key: 'more', label: 'More', icon: MoreHorizontal },
] as const

function Logo() {
  return (
    <div className="brand-lockup" aria-label="RallyPad">
      <svg className="brand-mark" viewBox="0 0 72 72" role="img" aria-label="RallyPad logo">
        <rect className="mark-calendar" x="10" y="7" width="48" height="44" rx="10" />
        <path className="mark-ring" d="M21 12v-7M47 12v-7" />
        <path className="mark-grid" d="M18 22h42M22 29v16M35 29v16M49 29v16" />
        <circle className="mark-ball" cx="37" cy="37" r="13" />
        <path className="mark-ball-line" d="M29 28c8 6 12 13 12 22M49 31c-9 3-15 8-20 16" />
        <path className="mark-handle" d="M34 52v14c0 3 2 5 5 5h1c3 0 5-2 5-5V52" />
        <path className="mark-spark" d="M12 34c-4 1-6 3-6 6m7 7c-3 0-6 2-8 5m57-18c3 1 5 3 6 6" />
      </svg>
      <div>
        <div className="brand-name">
          Rally<span>Pad</span>
        </div>
        <div className="brand-line">Run your club. Fill every court.</div>
      </div>
    </div>
  )
}

function IconButton({
  label,
  children,
  badge,
  onClick,
}: {
  label: string
  children: ReactNode
  badge?: number
  onClick?: () => void
}) {
  return (
    <button className="icon-button" type="button" aria-label={label} title={label} onClick={onClick}>
      {children}
      {badge ? <span className="notification-badge">{badge}</span> : null}
    </button>
  )
}

function TopHeader() {
  return (
    <header className="hero-panel">
      <div className="court-lines" aria-hidden="true" />
      <div className="top-row">
        <Logo />
        <div className="header-actions">
          <IconButton label="Reminders" badge={3}>
            <Bell size={22} />
          </IconButton>
          <IconButton label="Club profile">
            <UserRound size={23} />
          </IconButton>
        </div>
      </div>

      <h1>Good morning, Alex</h1>

      <section className="stats-panel" aria-label="Today at a glance">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article className="stat" key={stat.label}>
              <span className="stat-icon">
                <Icon size={17} />
              </span>
              <span className="stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
              <span className={stat.detail.startsWith('+') ? 'positive-detail' : ''}>{stat.detail}</span>
            </article>
          )
        })}
      </section>
    </header>
  )
}

function SectionHeader({
  title,
  action,
  count,
}: {
  title: string
  action?: string
  count?: number
}) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {count ? <span className="count-badge">{count}</span> : null}
      {action ? (
        <button type="button" className="text-action">
          {action}
          <ChevronRight size={17} />
        </button>
      ) : null}
    </div>
  )
}

function SegmentedControl({
  selected,
  onChange,
}: {
  selected: CourtFilter
  onChange: (filter: CourtFilter) => void
}) {
  const filters: CourtFilter[] = ['All Courts', 'Court 1', 'Court 2', 'Court 3', 'Court 4']

  return (
    <div className="court-filter" aria-label="Court filter">
      {filters.map((filter) => (
        <button
          className={selected === filter ? 'selected' : ''}
          key={filter}
          data-testid={`court-filter-${filter.toLowerCase().replaceAll(' ', '-')}`}
          type="button"
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

function ScheduleCard({
  selectedCourt,
  onCourtChange,
  onNewBooking,
}: {
  selectedCourt: CourtFilter
  onCourtChange: (filter: CourtFilter) => void
  onNewBooking: () => void
}) {
  const visibleBookings = useMemo(
    () => bookings.filter((booking) => selectedCourt === 'All Courts' || booking.court === selectedCourt),
    [selectedCourt],
  )

  return (
    <section className="panel schedule-panel" id="bookings">
      <SectionHeader title="Today's Schedule" action="View calendar" />
      <SegmentedControl selected={selectedCourt} onChange={onCourtChange} />

      <div className="booking-list">
        {visibleBookings.map((booking) => (
          <button className={`booking-row ${booking.tone}`} key={`${booking.start}-${booking.court}`} type="button">
            <span className="time-block">
              <strong>{booking.start}</strong>
              <span>{booking.end}</span>
            </span>
            <span className="booking-main">
              <strong>{booking.court}</strong>
              <span>{booking.players}</span>
            </span>
            <span className={`status-pill ${booking.tone}`}>{booking.status}</span>
            <ChevronRight className="row-chevron" size={21} />
          </button>
        ))}
      </div>

      <button className="new-booking-button" type="button" data-testid="new-booking-button" onClick={onNewBooking}>
        <span className="court-mini" aria-hidden="true">
          <span />
        </span>
        <strong>New booking</strong>
        <ChevronRight size={20} />
      </button>
    </section>
  )
}

function FollowUpCard({ onClientsClick }: { onClientsClick: () => void }) {
  const [contacted, setContacted] = useState<string[]>([])

  return (
    <section className="panel compact-panel">
      <SectionHeader title="Follow-up Clients" count={4} />
      <div className="client-list">
        {clients.map((client) => {
          const isContacted = contacted.includes(client.name)
          const ActionIcon = client.action === 'call' ? Phone : MessageSquareText
          return (
            <div className="client-row" key={client.name}>
              <span>
                <strong>{client.name}</strong>
                <small>{isContacted ? 'Follow-up queued' : client.lastPlayed}</small>
              </span>
              <button
                className={isContacted ? 'round-action contacted' : 'round-action'}
                type="button"
                aria-label={`Follow up with ${client.name}`}
                title={`Follow up with ${client.name}`}
                onClick={() =>
                  setContacted((current) =>
                    current.includes(client.name)
                      ? current.filter((name) => name !== client.name)
                      : [...current, client.name],
                  )
                }
              >
                <ActionIcon size={18} />
              </button>
            </div>
          )
        })}
      </div>
      <button className="panel-link" type="button" onClick={onClientsClick}>
        View all
        <ChevronRight size={19} />
      </button>
    </section>
  )
}

function RemindersCard() {
  return (
    <section className="panel compact-panel">
      <SectionHeader title="Smart Reminders" count={3} />
      <div className="reminder-list">
        {reminders.map((reminder) => {
          const Icon = reminder.icon
          return (
            <button className="reminder-row" key={reminder.title} type="button">
              <Icon size={22} />
              <span>
                <strong>{reminder.title}</strong>
                <small>{reminder.detail}</small>
              </span>
              <ChevronRight size={19} />
            </button>
          )
        })}
      </div>
      <button className="panel-link" type="button">
        View all reminders
        <ChevronRight size={19} />
      </button>
    </section>
  )
}

function LoyaltyCard() {
  return (
    <section className="panel compact-panel">
      <SectionHeader title="Loyalty Punch Cards" />
      <div className="punch-card">
        <div>
          <strong>10x Open Play Pass</strong>
          <span>8 / 10 punches</span>
        </div>
        <div className="punch-row" aria-label="8 of 10 loyalty punches used">
          {Array.from({ length: 10 }).map((_, index) => (
            <span className={index < 8 ? 'punched' : ''} key={index} />
          ))}
        </div>
        <strong className="remaining">2 left</strong>
      </div>
      <button className="panel-link" type="button">
        View all cards
        <ChevronRight size={19} />
      </button>
    </section>
  )
}

function ClubPulseCard() {
  return (
    <section className="panel compact-panel pulse-card">
      <SectionHeader title="Club Pulse" action="This Week" />
      <div className="pulse-grid">
        <div>
          <span className="muted-label">Revenue</span>
          <strong className="large-number">€8,740</strong>
          <span className="positive-detail">+22% vs last week</span>
        </div>
        <svg className="sparkline" viewBox="0 0 180 92" role="img" aria-label="Weekly revenue trend">
          <path className="spark-fill" d="M8 70 C26 52 40 84 55 60 C69 39 82 54 96 36 C112 15 122 46 139 22 C154 0 164 18 174 13 L174 91 L8 91 Z" />
          <path className="spark-path" d="M8 70 C26 52 40 84 55 60 C69 39 82 54 96 36 C112 15 122 46 139 22 C154 0 164 18 174 13" />
          <path className="spark-dash" d="M146 25 C158 18 168 15 177 10" />
          <g className="spark-days">
            <text x="9" y="88">M</text>
            <text x="38" y="88">T</text>
            <text x="67" y="88">W</text>
            <text x="96" y="88">T</text>
            <text x="125" y="88">F</text>
            <text x="152" y="88">S</text>
            <text x="171" y="88">S</text>
          </g>
        </svg>
      </div>
      <div className="time-slot">
        <span>
          <small>Top Time Slot</small>
          <strong>19:00 - 21:00</strong>
        </span>
        <span className="slot-score">
          <UsersRound size={17} /> 85%
        </span>
      </div>
    </section>
  )
}

function Dashboard({
  selectedCourt,
  onCourtChange,
  onNewBooking,
  onClientsClick,
}: {
  selectedCourt: CourtFilter
  onCourtChange: (filter: CourtFilter) => void
  onNewBooking: () => void
  onClientsClick: () => void
}) {
  return (
    <main className="content">
      <ScheduleCard selectedCourt={selectedCourt} onCourtChange={onCourtChange} onNewBooking={onNewBooking} />
      <div className="dashboard-grid">
        <FollowUpCard onClientsClick={onClientsClick} />
        <RemindersCard />
        <LoyaltyCard />
        <ClubPulseCard />
      </div>
    </main>
  )
}

function BookingsView({ onNewBooking }: { onNewBooking: () => void }) {
  return (
    <main className="content page-content">
      <section className="panel page-panel">
        <SectionHeader title="Bookings Command" action="Today" />
        <div className="availability-list">
          {['Court 1', 'Court 2', 'Court 3', 'Court 4'].map((court, index) => (
            <div className="availability-row" key={court}>
              <span className="court-tile" aria-hidden="true" />
              <span>
                <strong>{court}</strong>
                <small>{index === 2 ? 'Open 13:00 - 14:30' : 'Next gap after 16:30'}</small>
              </span>
              <strong className={index === 2 ? 'open-slot' : 'booked-slot'}>{index === 2 ? 'Open' : 'Busy'}</strong>
            </div>
          ))}
        </div>
        <button className="primary-cta" type="button" onClick={onNewBooking}>
          <Plus size={20} />
          Create booking
        </button>
      </section>

      <section className="panel page-panel">
        <SectionHeader title="Check-in Queue" />
        <div className="queue-strip">
          <span>
            <strong>3</strong>
            waiting
          </span>
          <span>
            <strong>11:00</strong>
            next start
          </span>
          <span>
            <strong>€180</strong>
            unpaid
          </span>
        </div>
      </section>
    </main>
  )
}

function ClientsView() {
  const pipeline = [
    ['Dormant', 12, '#ff7056'],
    ['Birthday', 4, '#c7f24b'],
    ['VIP', 18, '#1f8a5b'],
  ] as const

  return (
    <main className="content page-content">
      <section className="panel page-panel">
        <SectionHeader title="Client Follow-up" count={4} />
        <div className="client-pipeline">
          {pipeline.map(([label, value, color]) => (
            <div className="pipeline-pill" key={label}>
              <span style={{ backgroundColor: color }} />
              <strong>{value}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <div className="client-list expanded">
          {clients.map((client) => (
            <div className="client-row" key={client.name}>
              <span>
                <strong>{client.name}</strong>
                <small>{client.lastPlayed}</small>
              </span>
              <span className="loyalty-meter" aria-label={`${client.loyalty} loyalty punches`}>
                {client.loyalty}/10
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel page-panel">
        <SectionHeader title="Win-back Campaign" />
        <div className="campaign-card">
          <Zap size={24} />
          <span>
            <strong>Send 12 off-peak invites</strong>
            <small>Best target: players inactive for 21+ days</small>
          </span>
        </div>
      </section>
    </main>
  )
}

function MoreView() {
  const moreItems = [
    { icon: WalletCards, title: 'Punch card studio', detail: 'Open play passes and VIP bundles' },
    { icon: Bell, title: 'Reminder automation', detail: 'Check-ins, payments, follow-ups' },
    { icon: Star, title: 'Loyalty rewards', detail: 'Milestones, referrals, club perks' },
    { icon: HeartPulse, title: 'Club health', detail: 'Occupancy, retention, revenue' },
  ]

  return (
    <main className="content page-content">
      <section className="panel page-panel">
        <SectionHeader title="Growth Tools" />
        <div className="more-list">
          {moreItems.map((item) => {
            const Icon = item.icon
            return (
              <button className="more-row" type="button" key={item.title}>
                <span className="more-icon">
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <ChevronRight size={20} />
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function BottomNav({
  activeTab,
  onTabChange,
  onNewBooking,
}: {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
  onNewBooking: () => void
}) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isNew = tab.key === 'new'
        const selected = tab.key === activeTab
        return (
          <button
            className={`${selected ? 'active' : ''} ${isNew ? 'new-tab' : ''}`}
            type="button"
            key={tab.key}
            data-testid={`nav-${tab.key}`}
            aria-current={selected ? 'page' : undefined}
            onClick={() => (isNew ? onNewBooking() : onTabChange(tab.key))}
          >
            <span className="nav-icon">
              <Icon size={isNew ? 31 : 25} />
            </span>
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function BookingSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [saved, setSaved] = useState(false)

  if (!isOpen) {
    return null
  }

  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <section className="booking-sheet" role="dialog" aria-modal="true" aria-label="New booking" onClick={(event) => event.stopPropagation()}>
        <span className="sheet-handle" />
        <SectionHeader title={saved ? 'Booking staged' : 'New booking'} />
        <div className="booking-form">
          <label>
            Court
            <select defaultValue="Court 3">
              <option>Court 1</option>
              <option>Court 2</option>
              <option>Court 3</option>
              <option>Court 4</option>
            </select>
          </label>
          <label>
            Time
            <select defaultValue="13:00 - 14:30">
              <option>11:00 - 12:30</option>
              <option>13:00 - 14:30</option>
              <option>19:00 - 20:30</option>
            </select>
          </label>
          <label>
            Client
            <input defaultValue="Maya Haddad" />
          </label>
        </div>
        {saved ? <p className="success-note">Confirmation, reminder, and loyalty punch are ready.</p> : null}
        <button className="primary-cta" type="button" data-testid="stage-booking" onClick={() => setSaved(true)}>
          <Plus size={20} />
          {saved ? 'Saved for demo' : 'Stage booking'}
        </button>
      </section>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [selectedCourt, setSelectedCourt] = useState<CourtFilter>('All Courts')
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false)

  return (
    <div className="app-stage">
      <div className="phone-shell">
        <TopHeader />
        {activeTab === 'dashboard' ? (
          <Dashboard
            selectedCourt={selectedCourt}
            onCourtChange={setSelectedCourt}
            onNewBooking={() => setBookingSheetOpen(true)}
            onClientsClick={() => setActiveTab('clients')}
          />
        ) : null}
        {activeTab === 'bookings' ? <BookingsView onNewBooking={() => setBookingSheetOpen(true)} /> : null}
        {activeTab === 'clients' ? <ClientsView /> : null}
        {activeTab === 'more' ? <MoreView /> : null}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onNewBooking={() => setBookingSheetOpen(true)} />
        <BookingSheet isOpen={bookingSheetOpen} onClose={() => setBookingSheetOpen(false)} />
      </div>
    </div>
  )
}

export default App
