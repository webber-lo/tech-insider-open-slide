import type { ReactNode } from 'react';
import type {
  ContentCardData,
  CoverContent,
  MythClassContent,
  PaletteReferenceContent,
  ProgramContent,
  TrustPyramidContent,
} from './schema';
import { basePage, colors, effects, layout, typography } from './theme';

const pageNumber = (index: number, total: number) =>
  `${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

export const PageBadge = ({ page, dark }: { page: string; dark?: boolean }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      color: dark ? colors.white : colors.ink,
      fontSize: typography.small,
      fontWeight: 800,
      letterSpacing: '0.04em',
    }}
  >
    <span style={{ width: 52, height: 5, background: colors.brandBlue, display: 'block' }} />
    <span
      style={{
        border: `1px solid ${dark ? 'rgba(255,255,255,0.30)' : colors.line}`,
        background: dark ? 'rgba(255,255,255,0.08)' : colors.white,
        borderRadius: 999,
        padding: '8px 18px 9px',
        boxShadow: dark ? 'none' : effects.badgeShadow,
      }}
    >
      TI / {page}
    </span>
  </div>
);

export const Footer = ({
  index,
  total,
  dark,
  label = 'TECH INSIDER',
}: {
  index: number;
  total: number;
  dark?: boolean;
  label?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: layout.padX,
      right: layout.padX,
      bottom: layout.footerBottom,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: typography.small,
      color: dark ? 'rgba(255,255,255,0.72)' : colors.muted,
      letterSpacing: 0,
    }}
  >
    <span style={{ fontWeight: 700, color: dark ? undefined : colors.ink }}>{label}</span>
    <PageBadge page={pageNumber(index, total)} dark={dark} />
  </div>
);

export const PageTitle = ({ kicker, title }: { kicker: string; title: string }) => (
  <div style={{ position: 'absolute', left: layout.padX, top: layout.padTop }}>
    <div
      style={{
        fontSize: typography.kicker,
        fontWeight: 800,
        color: colors.brandBlue,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 22,
      }}
    >
      {kicker}
    </div>
    <h1
      style={{
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: typography.pageTitle,
        lineHeight: 1.12,
        fontWeight: 800,
        color: colors.ink,
        letterSpacing: 0,
      }}
    >
      {title}
    </h1>
  </div>
);

export const BrandWatermark = ({ compact }: { compact?: boolean }) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      right: compact ? -78 : -96,
      top: compact ? -72 : -110,
      width: compact ? 250 : 300,
      height: compact ? 250 : 300,
      opacity: 0.13,
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: `${compact ? 34 : 42}px solid ${colors.paper}`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: compact ? 104 : 124,
        top: compact ? -16 : -22,
        width: compact ? 34 : 42,
        height: compact ? 286 : 340,
        background: colors.paper,
        transform: 'rotate(18deg)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: compact ? 32 : 42,
        top: compact ? 98 : 118,
        width: compact ? 180 : 216,
        height: compact ? 34 : 42,
        background: colors.paper,
        transform: 'rotate(18deg)',
      }}
    />
  </div>
);

export const ContentCard = ({ label, body, color }: ContentCardData) => (
  <div
    style={{
      background: colors.white,
      border: `1px solid ${colors.line}`,
      borderTop: `8px solid ${color ?? colors.brandBlue}`,
      borderRadius: layout.radius,
      padding: '36px 38px 34px',
      minHeight: 224,
      boxShadow: effects.cardShadow,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 18,
        height: '100%',
        background: color ?? colors.brandBlue,
        opacity: 0.95,
      }}
    />
    <div style={{ fontSize: typography.cardTitle, lineHeight: 1.22, fontWeight: 800, color: colors.ink }}>
      {label}
    </div>
    <p style={{ margin: '22px 0 0', fontSize: 25, lineHeight: 1.42, color: colors.muted }}>
      {body}
    </p>
  </div>
);

const Info = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div style={{ borderTop: `5px solid ${color}`, paddingTop: 22 }}>
    <div style={{ fontSize: 22, fontWeight: 800, color: colors.muted, marginBottom: 16 }}>{label}</div>
    <div style={{ fontSize: 38, lineHeight: 1.24, fontWeight: 800, color: colors.ink }}>{value}</div>
  </div>
);

export const CoverPage = ({
  data,
  index,
  total,
}: {
  data: CoverContent;
  index: number;
  total: number;
}) => (
  <div style={{ ...basePage, background: colors.brandNavy, color: colors.paper }}>
    <div
      style={{
        position: 'absolute',
        right: -180,
        top: -260,
        width: 740,
        height: 740,
        border: '86px solid rgba(73,136,196,0.28)',
        borderRadius: '50%',
      }}
    />
    <div style={{ position: 'absolute', left: layout.padX, top: 132, width: 128, height: 8, background: colors.brandBlue }} />
    <div style={{ position: 'absolute', left: layout.padX, top: 214, width: 1400 }}>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: colors.brandBlue,
          letterSpacing: '0.1em',
          marginBottom: 36,
        }}
      >
        {data.kicker}
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: typography.hero,
          lineHeight: 1.02,
          fontWeight: 800,
          color: colors.paper,
          letterSpacing: 0,
        }}
      >
        {data.title}
      </h1>
      <p style={{ margin: '38px 0 0', maxWidth: 1260, fontSize: 42, lineHeight: 1.35, color: 'rgba(247,248,240,0.86)' }}>
        {data.subtitle}
      </p>
    </div>
    <div
      style={{
        position: 'absolute',
        left: layout.padX,
        right: layout.padX,
        bottom: 150,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 34,
      }}
    >
      {data.cards.map((card) => (
        <ContentCard key={card.label} {...card} />
      ))}
    </div>
    <Footer index={index} total={total} dark label={data.footer} />
  </div>
);

export const TrustPyramidPage = ({
  data,
  index,
  total,
}: {
  data: TrustPyramidContent;
  index: number;
  total: number;
}) => (
  <div style={{ ...basePage, background: colors.paper }}>
    <PageTitle kicker={data.kicker} title={data.title} />
    {data.levels.map((level, levelIndex) => {
      const widths = [720, 1040, 1360, 1680];
      const top = 292 + levelIndex * 160;
      const width = widths[levelIndex] ?? 1680;

      return (
        <div
          key={level.label}
          style={{
            position: 'absolute',
            left: (layout.pageWidth - width) / 2,
            top,
            width,
            height: 142,
            background: colors.white,
            color: colors.ink,
            border: `1px solid ${colors.line}`,
            borderLeft: `22px solid ${level.color ?? colors.brandBlue}`,
            borderRadius: layout.radius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 52px',
            boxShadow: '0 24px 48px rgba(8, 32, 51, 0.09)',
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 800 }}>{level.label}</div>
          <div style={{ maxWidth: 760, fontSize: 25, lineHeight: 1.34, color: colors.muted }}>{level.body}</div>
        </div>
      );
    })}
    <Footer index={index} total={total} />
  </div>
);

export const ProgramPage = ({ data, index, total }: { data: ProgramContent; index: number; total: number }) => (
  <div style={{ ...basePage, background: colors.paper }}>
    <PageTitle kicker="Program" title={data.title} />
    <div
      style={{
        position: 'absolute',
        left: layout.padX,
        right: layout.padX,
        top: 300,
        display: 'grid',
        gridTemplateColumns: '460px 1fr',
        gap: 34,
      }}
    >
      <div
        style={{
          background: data.accent,
          color: colors.white,
          borderRadius: layout.radius,
          padding: '50px 46px',
          minHeight: 472,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BrandWatermark />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 16, background: colors.brandPaleBlue, opacity: 0.95 }} />
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.78)', fontWeight: 800, marginBottom: 30 }}>
          節目定位
        </div>
        <p style={{ margin: 0, fontSize: 38, lineHeight: 1.35, fontWeight: 800, color: colors.white }}>
          {data.positioning}
        </p>
      </div>
      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.line}`,
          borderRadius: layout.radius,
          padding: '44px 50px',
          minHeight: 472,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px 44px',
        }}
      >
        <Info label="主載體" value={data.carrier} color={data.accent} />
        <Info label="長度" value={data.length} color={data.accent} />
        <Info label="內容結構" value={data.structure} color={data.accent} />
        <Info label="選題來源 / 合作" value={data.source} color={data.accent} />
      </div>
    </div>
    <Footer index={index} total={total} />
  </div>
);

export const MythClassPage = ({
  data,
  index,
  total,
}: {
  data: MythClassContent;
  index: number;
  total: number;
}) => (
  <div style={{ ...basePage, background: colors.paper }}>
    <PageTitle kicker={data.kicker} title={data.title} />
    <div
      style={{
        position: 'absolute',
        left: layout.padX,
        right: layout.padX,
        top: 300,
        display: 'grid',
        gridTemplateColumns: '0.82fr 1.18fr',
        gap: 34,
      }}
    >
      <div
        style={{
          background: colors.white,
          color: colors.ink,
          border: `1px solid ${colors.line}`,
          borderRadius: layout.radius,
          padding: '48px 48px',
          minHeight: 470,
          boxShadow: effects.cardShadow,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, color: colors.brandBlue, marginBottom: 26 }}>{data.duration}</div>
        <div style={{ fontSize: 54, lineHeight: 1.16, fontWeight: 800 }}>{data.headline}</div>
        <p style={{ margin: '34px 0 0', fontSize: 28, lineHeight: 1.45, color: colors.muted }}>{data.body}</p>
      </div>
      <div
        style={{
          background: colors.brandNavy,
          color: colors.white,
          borderRadius: layout.radius,
          minHeight: 470,
          padding: '44px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BrandWatermark compact />
        {data.examples.map((example) => (
          <div key={example.label}>
            <div style={{ fontSize: 25, fontWeight: 800, color: colors.brandPaleBlue, marginBottom: 18 }}>{example.label}</div>
            <div style={{ fontSize: 34, lineHeight: 1.25, fontWeight: 800 }}>{example.body}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer index={index} total={total} />
  </div>
);

const Swatch = ({
  name,
  hex,
  role,
  textDark,
}: {
  name: string;
  hex: string;
  role: string;
  textDark?: boolean;
}) => (
  <div
    style={{
      background: hex,
      color: textDark ? colors.ink : colors.white,
      borderRadius: layout.radius,
      padding: '18px 26px',
      minHeight: 86,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      border: textDark ? `1px solid ${colors.line}` : 'none',
      boxShadow: effects.cardShadow,
    }}
  >
    <div style={{ minWidth: 220 }}>
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.12 }}>{name}</div>
      <div style={{ marginTop: 6, fontSize: 19, fontWeight: 800, opacity: 0.78 }}>{hex}</div>
    </div>
    <div style={{ flex: 1, fontSize: 20, lineHeight: 1.28, opacity: 0.86 }}>{role}</div>
  </div>
);

const TokenRow = ({
  name,
  hex,
  role,
  textDark,
}: {
  name: string;
  hex: string;
  role: string;
  textDark?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '78px 1fr',
      gap: 18,
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: `1px solid ${colors.line}`,
    }}
  >
    <div style={{ width: 66, height: 48, borderRadius: 6, background: hex, border: textDark ? `1px solid ${colors.line}` : 'none' }} />
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
        <div style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 800, color: colors.ink }}>{name}</div>
        <div style={{ fontSize: 20, lineHeight: 1.2, fontWeight: 800, color: colors.muted }}>{hex}</div>
      </div>
      <div style={{ marginTop: 6, fontSize: 20, lineHeight: 1.32, color: colors.muted }}>{role}</div>
    </div>
  </div>
);

export const PaletteReferencePage = ({
  data,
  index,
  total,
}: {
  data: PaletteReferenceContent;
  index: number;
  total: number;
}) => (
  <div style={{ ...basePage, background: colors.paper }}>
    <PageTitle kicker={data.kicker} title={data.title} />
    <div
      style={{
        position: 'absolute',
        left: layout.padX,
        right: layout.padX,
        top: 246,
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 38,
      }}
    >
      <section>
        <PanelTitle>品牌色階</PanelTitle>
        <div style={{ display: 'grid', gap: 12 }}>
          {data.brandColors.map((color) => (
            <Swatch key={color.hex} {...color} />
          ))}
        </div>
      </section>
      <section>
        <PanelTitle>功能色 token</PanelTitle>
        {data.tokens.map((token) => (
          <TokenRow key={token.hex} {...token} />
        ))}
      </section>
    </div>
    <Footer index={index} total={total} />
  </div>
);

const PanelTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 28, fontWeight: 800, color: colors.ink, marginBottom: 16 }}>{children}</div>
);
