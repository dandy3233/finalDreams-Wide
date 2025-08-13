import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@dreamswide.et' },
    update: {},
    create: {
      email: 'admin@dreamswide.et',
      name: 'Admin User',
      role: 'SUPER_ADMIN',
      permissions: JSON.stringify([
        'CREATE_JOBS',
        'EDIT_JOBS',
        'DELETE_JOBS',
        'CREATE_CONTENT',
        'EDIT_CONTENT',
        'DELETE_CONTENT',
        'MANAGE_USERS',
        'VIEW_ANALYTICS',
        'SYSTEM_SETTINGS'
      ]),
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'dawit.tadesse@email.com' },
      update: {},
      create: {
        email: 'dawit.tadesse@email.com',
        name: 'Dawit Tadesse',
        role: 'USER',
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'hanan.ahmed@email.com' },
      update: {},
      create: {
        email: 'hanan.ahmed@email.com',
        name: 'Hanan Ahmed',
        role: 'USER',
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'moderator@dreamswide.et' },
      update: {},
      create: {
        email: 'moderator@dreamswide.et',
        name: 'Content Moderator',
        role: 'MODERATOR',
        verified: true,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Software Developer',
        company: 'Ethiopian Airlines',
        category: 'TECHNOLOGY',
        location: 'Addis Ababa',
        salary: 'ETB 25,000 - 35,000',
        type: 'FULL_TIME',
        description: 'We are seeking a Senior Software Developer to join our IT team and help modernize our airline systems.',
        requirements: JSON.stringify([
          "Bachelor's degree in Computer Science",
          "5+ years of experience",
          "React, Node.js, Python",
          "Database design experience"
        ]),
        deadline: new Date('2024-12-31'),
        featured: true,
        verified: true,
        authorId: users[2].id, // Moderator
      },
    }),
    prisma.job.create({
      data: {
        title: 'Banking Operations Manager',
        company: 'Commercial Bank of Ethiopia',
        category: 'BANKING',
        location: 'Addis Ababa',
        salary: 'ETB 30,000 - 45,000',
        type: 'FULL_TIME',
        description: 'Lead banking operations and ensure efficient customer service delivery across our branch network.',
        requirements: JSON.stringify([
          "Bachelor's in Finance/Banking",
          "7+ years banking experience",
          "Management experience",
          "Strong analytical skills"
        ]),
        deadline: new Date('2024-12-31'),
        featured: true,
        verified: true,
        authorId: users[2].id,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Analyst',
        company: 'Ministry of Health',
        category: 'GOVERNMENT',
        location: 'Addis Ababa',
        salary: 'ETB 18,000 - 25,000',
        type: 'FULL_TIME',
        description: 'Analyze health data to support evidence-based policy making and program planning.',
        requirements: JSON.stringify([
          "Bachelor's in Statistics/Data Science",
          "R/Python programming",
          "Data visualization tools",
          "Public health knowledge"
        ]),
        deadline: new Date('2024-12-31'),
        featured: false,
        verified: true,
        authorId: users[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${jobs.length} jobs`);

  // Create sample content
  const content = await Promise.all([
    prisma.content.create({
      data: {
        title: 'Timkat Festival Celebration Guide 2024',
        type: 'CULTURAL_CONTENT',
        content: 'Timkat, the Ethiopian Orthodox celebration of Epiphany, is one of the most colorful and spiritual festivals in Ethiopia. Celebrated on January 19th (or 20th in leap years), it commemorates the baptism of Jesus Christ in the River Jordan.',
        description: 'A comprehensive guide to celebrating Timkat festival in Ethiopia.',
        category: 'Festival',
        featured: true,
        authorId: users[2].id,
      },
    }),
    prisma.content.create({
      data: {
        title: 'Ethiopian Coffee Ceremony Tradition',
        type: 'CULTURAL_CONTENT',
        content: 'The Ethiopian coffee ceremony is an integral part of Ethiopian culture and daily life. This ancient tradition brings communities together through the preparation and sharing of coffee.',
        description: 'Learn about the sacred coffee ceremony that binds Ethiopian communities.',
        category: 'Tradition',
        featured: true,
        authorId: users[2].id,
      },
    }),
    prisma.content.create({
      data: {
        title: 'Emperor Menelik II: Architect of Modern Ethiopia',
        type: 'HISTORICAL_POST',
        content: 'Emperor Menelik II (1844-1913) was one of Ethiopia\'s most influential rulers, credited with modernizing the country and maintaining its independence during the colonial period.',
        description: 'Exploring the legacy of Emperor Menelik II in modern Ethiopia.',
        category: 'Historical Figure',
        featured: true,
        authorId: users[2].id,
      },
    }),
    prisma.content.create({
      data: {
        title: 'New University Scholarships Available for 2024',
        type: 'NEWS_ANNOUNCEMENT',
        content: 'The Ministry of Education announces new scholarship opportunities for Ethiopian students pursuing higher education in various fields.',
        description: 'Apply now for fully-funded scholarships to top universities.',
        category: 'Scholarship',
        featured: true,
        urgent: true,
        authorId: users[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${content.length} content items`);

  // Create some sample applications
  const applications = await Promise.all([
    prisma.jobApplication.create({
      data: {
        userId: users[0].id,
        jobId: jobs[0].id,
        coverLetter: 'I am excited to apply for this position...',
        status: 'PENDING',
      },
    }),
    prisma.jobApplication.create({
      data: {
        userId: users[1].id,
        jobId: jobs[1].id,
        coverLetter: 'With my banking experience...',
        status: 'REVIEWING',
      },
    }),
  ]);

  console.log(`✅ Created ${applications.length} job applications`);

  // Create some likes and comments
  const likes = await Promise.all([
    prisma.like.create({
      data: {
        userId: users[0].id,
        contentId: content[0].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[1].id,
        contentId: content[0].id,
      },
    }),
  ]);

  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Great article about Timkat! Very informative.',
        authorId: users[0].id,
        contentId: content[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'The coffee ceremony is such a beautiful tradition.',
        authorId: users[1].id,
        contentId: content[1].id,
      },
    }),
  ]);

  console.log(`✅ Created ${likes.length} likes and ${comments.length} comments`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- 1 admin user (admin@dreamswide.et)`);
  console.log(`- ${users.length} regular users`);
  console.log(`- ${jobs.length} job postings`);
  console.log(`- ${content.length} content items`);
  console.log(`- ${applications.length} job applications`);
  console.log(`- ${likes.length} likes and ${comments.length} comments`);
  console.log('\n🔐 Default admin credentials:');
  console.log('Email: admin@dreamswide.et');
  console.log('Password: admin123 (set in your login logic)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
