# Visa Consultancy Website

A modern React + Vite website for visa consultancy services with Supabase backend integration.

## Project Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your actual values in `.env`:
     ```
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     VITE_WHATSAPP_NUMBER=your_whatsapp_number_here
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Supabase Setup

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and create a new project
- Wait for your database to be ready

### 2. Create Messages Table
Run this SQL in your Supabase SQL Editor:
```sql
-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public users to INSERT messages
CREATE POLICY "Allow public to insert messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to SELECT messages
CREATE POLICY "Allow authenticated to select messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to UPDATE messages (for marking as read)
CREATE POLICY "Allow authenticated to update messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to DELETE messages
CREATE POLICY "Allow authenticated to delete messages"
  ON messages
  FOR DELETE
  TO authenticated
  USING (true);
```

### 3. Create Gallery Images Table
Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to SELECT gallery images
CREATE POLICY "Allow public to select gallery images"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to INSERT gallery images
CREATE POLICY "Allow authenticated to insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to DELETE gallery images
CREATE POLICY "Allow authenticated to delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);
```

### 4. Create Newsletter Subscribers Table
Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT newsletter subscribers
CREATE POLICY "Allow public to insert newsletter subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to SELECT/DELETE newsletter subscribers
CREATE POLICY "Allow authenticated to select newsletter subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated to delete newsletter subscribers"
  ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);
```

### 5. Create Storage Bucket
- Go to Supabase Dashboard → Storage
- Create a new bucket named `gallery-images`
- Set it to public (so images can be viewed by everyone)

### 6. RLS Policies for Storage
Add these policies for the `gallery-images` bucket:
```sql
-- Allow public to view images
CREATE POLICY "Public Access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery-images');

-- Only authenticated users can upload/delete images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');
```

### 7. Create Admin User
- Go to Supabase Dashboard → Authentication → Users
- Click "Add user" → "Create new user"
- Enter email and password for admin access
- Toggle "Auto-confirm user" ON
- Use these credentials to log into the admin panel

### 8. Setup Automated Thank-You Emails (Optional)
To enable automated thank-you emails when someone submits the contact form:

1. **Sign up for Resend:**
   - Go to [resend.com](https://resend.com) and create an account
   - Resend offers a free tier with up to 3,000 emails/month

2. **Get your API key:**
   - In Resend dashboard, go to API Keys
   - Create a new API key

3. **Add secrets to Supabase:**
   - Go to Supabase Dashboard → Settings → Secrets
   - Add a new secret named `RESEND_API_KEY` with your Resend API key
   - (Optional) Add `WHATSAPP_NUMBER` secret with your WhatsApp number

4. **Deploy the Edge Function:**
   - Install Supabase CLI: `npm install -g supabase`
   - Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
   - Deploy the function: `supabase functions deploy send-thank-you-email`

## Admin Panel

- **Login URL:** `/admin/panel/login`
- **Dashboard URL:** `/admin/panel`
- The admin panel is not linked in the main navigation for security reasons

### Features:
1. **Messages Section:** View all contact form submissions, mark as read, delete
2. **Image Gallery:** Upload images with country tags, delete images

## Newsletter

- Located in the footer
- Users can subscribe with their email
- Duplicate emails are handled gracefully
- All subscriptions are stored in `newsletter_subscribers` table

## WhatsApp Integration

- Add your WhatsApp number to the `.env` file as `VITE_WHATSAPP_NUMBER`
- The number should be in international format without any spaces or special characters (e.g., `923214244140` for Pakistan)

## Toast Notifications

The website uses custom toast notifications instead of browser alerts for:
- Success messages (green)
- Error messages (red)
- Info messages (blue)

## Deployment

### Vercel
1. Push your code to GitHub
2. Import the project on Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project on Netlify
3. Add the environment variables in Netlify dashboard
4. Deploy!

## Technologies Used

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage, Edge Functions)
- **Routing:** React Router DOM
- **Icons:** React Icons
- **Email Service:** Resend (optional)

## Legacy Backend

The original Node.js/Express backend has been moved to `/legacy-backend` directory for reference purposes.