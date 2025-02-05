import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Deal, Contact, Activity, Proposal } from '../types';
import toast from 'react-hot-toast';

// Deals
export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          company:companies(name),
          contact:contacts(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDeals(data.map(deal => ({
        ...deal,
        company: deal.company?.name || '',
        contact: deal.contact?.name || ''
      })));
    } catch (error) {
      toast.error('Error loading deals');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    try {
      const { error } = await supabase
        .from('deals')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Deal updated successfully');
      await fetchDeals();
    } catch (error) {
      toast.error('Error updating deal');
      console.error('Error:', error);
    }
  };

  const createDeal = async (deal: Omit<Deal, 'id'>) => {
    try {
      const { error } = await supabase
        .from('deals')
        .insert([deal]);

      if (error) throw error;

      toast.success('Deal created successfully');
      await fetchDeals();
    } catch (error) {
      toast.error('Error creating deal');
      console.error('Error:', error);
    }
  };

  return { deals, loading, updateDeal, createDeal, fetchDeals };
};

// Contacts
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          company:companies(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContacts(data.map(contact => ({
        ...contact,
        company: contact.company?.name || ''
      })));
    } catch (error) {
      toast.error('Error loading contacts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([contact]);

      if (error) throw error;

      toast.success('Contact created successfully');
      await fetchContacts();
    } catch (error) {
      toast.error('Error creating contact');
      console.error('Error:', error);
    }
  };

  return { contacts, loading, createContact, fetchContacts };
};

// Activities
export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          deal:deals(title),
          contact:contacts(name)
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      setActivities(data.map(activity => ({
        ...activity,
        relatedTo: {
          type: activity.deal_id ? 'deal' : 'contact',
          id: activity.deal_id || activity.contact_id,
          name: activity.deal?.title || activity.contact?.name
        }
      })));
    } catch (error) {
      toast.error('Error loading activities');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activity: Omit<Activity, 'id'>) => {
    try {
      const { error } = await supabase
        .from('activities')
        .insert([activity]);

      if (error) throw error;

      toast.success('Activity created successfully');
      await fetchActivities();
    } catch (error) {
      toast.error('Error creating activity');
      console.error('Error:', error);
    }
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    try {
      const { error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Activity updated successfully');
      await fetchActivities();
    } catch (error) {
      toast.error('Error updating activity');
      console.error('Error:', error);
    }
  };

  return { activities, loading, createActivity, updateActivity, fetchActivities };
};

// Proposals
export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select(`
          *,
          deal:deals(title, company_id),
          company:deals(companies(name))
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProposals(data.map(proposal => ({
        ...proposal,
        dealTitle: proposal.deal?.title || '',
        company: proposal.company?.name || ''
      })));
    } catch (error) {
      toast.error('Error loading proposals');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (proposal: Omit<Proposal, 'id'>) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .insert([proposal]);

      if (error) throw error;

      toast.success('Proposal created successfully');
      await fetchProposals();
    } catch (error) {
      toast.error('Error creating proposal');
      console.error('Error:', error);
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Proposal updated successfully');
      await fetchProposals();
    } catch (error) {
      toast.error('Error updating proposal');
      console.error('Error:', error);
    }
  };

  return { proposals, loading, createProposal, updateProposal, fetchProposals };
};

// Dashboard Metrics
export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_dashboard_metrics');

      if (error) throw error;

      setMetrics(data);
    } catch (error) {
      toast.error('Error loading dashboard metrics');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, fetchMetrics };
};