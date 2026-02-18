import SettingsContent from "@/components/admin/settings/SettingsContent";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | AMP Vending Admin',
  description: 'Manage your system preferences, security, and configurations'
};

export default function SettingsPage() {
  return <SettingsContent />;
}
