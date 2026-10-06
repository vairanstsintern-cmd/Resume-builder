import React, { useState, useEffect } from 'react';
const createMatIcon = (name) => ({ size = 24, color, className = '', style = {} }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontSize: `${size}px`, color, ...style }}>
    {name}
  </span>
);

const Bell = createMatIcon('notifications');
const Mail = createMatIcon('mail');
const Search = createMatIcon('search');
const Filter = createMatIcon('filter_list');
const Plus = createMatIcon('add');
const MoreVertical = createMatIcon('more_vert');
const FileText = createMatIcon('description');
const HelpCircle = createMatIcon('help');
const Settings = createMatIcon('settings');
const ChevronLeft = createMatIcon('chevron_left');
const ChevronRight = createMatIcon('chevron_right');
const Eye = createMatIcon('visibility');
const Pencil = createMatIcon('edit');
const Copy = createMatIcon('content_copy');
const Trash2 = createMatIcon('delete');
const X = createMatIcon('close');
const ArrowLeft = createMatIcon('arrow_back');
const Printer = createMatIcon('print');
const Download = createMatIcon('download');
const AlertCircle = createMatIcon('warning');
const Check = createMatIcon('check');
const Calendar = createMatIcon('calendar_today');
const Settings2 = createMatIcon('tune');
const ChevronDown = createMatIcon('keyboard_arrow_down');
const Info = createMatIcon('info');
const Star = createMatIcon('star');
const Bookmark = createMatIcon('bookmark');
const Edit2 = createMatIcon('edit');
const EyeOff = createMatIcon('visibility_off');
const GripVertical = createMatIcon('drag_indicator');
import './index.css';

const MOCK_DATA = [
  { id: 'EMP-1024', name: 'Shanmugam Sundaram P', initials: 'SS', avatarBg: 'avatar-bg-1', role: 'Full Stack Developer', exp: '12 Years 4 Months', client: 'Qantler Digital', date: '18 Sept 2026', status: 'Draft' },
  { id: 'EMP-1001', name: 'Madhavan. S', initials: 'MS', avatarBg: 'avatar-bg-1', role: 'Senior Java Developer', exp: '8+ Years', client: 'ABC Technologies', date: '19 Aug 2026', status: 'Draft' },
  { id: 'EMP-1002', name: 'Madhavan. S', initials: 'MS', avatarBg: 'avatar-bg-2', role: 'Senior Java Developer', exp: '8+ Years', client: 'ABC Technologies', date: '19 Aug 2026', status: 'Submitted' },
  { id: 'EMP-1031', name: 'Arun Kumar', initials: 'AK', avatarBg: 'avatar-bg-2', role: 'Senior React Developer', exp: '6+ Years', client: 'ABC Technologies', date: '18 Aug 2026', status: 'Submitted' },
  { id: 'EMP-1025', name: 'Shanmugam Sundaram P', initials: 'SS', avatarBg: 'avatar-bg-3', role: 'Full Stack Developer (ReactJS and NodeJS)', exp: '12+ Years', client: 'ABC Technologies', date: '11 Aug 2026', status: 'Submitted' },
  { id: 'EMP-1078', name: 'David Fernandes', initials: 'DF', avatarBg: 'avatar-bg-4', role: 'Technical Lead — Enterprise Applications', exp: '14+ Years', client: 'Northwind Logistics', date: '05 Aug 2026', status: 'Submitted' },
  { id: 'EMP-1052', name: 'Rahul Sharma', initials: 'RS', avatarBg: 'avatar-bg-3', role: 'DevOps Engineer', exp: '9+ Years', client: 'Finobl Systems', date: '25 Jul 2026', status: 'Submitted' },
  { id: 'EMP-1032', name: 'Arun Kumar', initials: 'AK', avatarBg: 'avatar-bg-1', role: 'React Developer', exp: '9 Years 8 Months', client: 'ABC Technologies', date: 'Not Submitted', status: 'Draft' },
];

function App() {
  const [resumes, setResumes] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedFilters, setSelectedFilters] = useState({
    Client: [],
    Designation: [],
    'Experience (Years)': [],
    Status: [],
  });

  const getUniqueValues = (field) => [...new Set(resumes.map(r => r[field]))].sort();
  const filterOptions = {
    Client: getUniqueValues('client'),
    Designation: getUniqueValues('role'),
    'Experience (Years)': getUniqueValues('exp'),
    Status: getUniqueValues('status'),
  };

  const filteredResumes = resumes.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesClient = selectedFilters.Client.length === 0 || selectedFilters.Client.includes(r.client);
    const matchesDesignation = selectedFilters.Designation.length === 0 || selectedFilters.Designation.includes(r.role);
    const matchesExp = selectedFilters['Experience (Years)'].length === 0 || selectedFilters['Experience (Years)'].includes(r.exp);
    const matchesStatus = selectedFilters.Status.length === 0 || selectedFilters.Status.includes(r.status);
    
    return matchesSearch && matchesClient && matchesDesignation && matchesExp && matchesStatus;
  });

  const toggleFilter = (tab, value) => {
    if (!selectedFilters[tab]) return;
    setSelectedFilters(prev => {
      const currentList = prev[tab];
      return {
        ...prev,
        [tab]: currentList.includes(value) ? currentList.filter(v => v !== value) : [...currentList, value]
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ Client: [], Designation: [], 'Experience (Years)': [], Status: [] });
  };
  
  const hasActiveFilters = Object.values(selectedFilters).some(list => list.length > 0);

  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('Client');
  const [viewingResume, setViewingResume] = useState(null);
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViewingSkillSet, setIsViewingSkillSet] = useState(false);
  const [isViewingProjects, setIsViewingProjects] = useState(false);
  const [isViewingResponsibilities, setIsViewingResponsibilities] = useState(false);
  const [activeSkillGroup, setActiveSkillGroup] = useState(1);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddRespGroupModalOpen, setIsAddRespGroupModalOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState(1);
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [draftResume, setDraftResume] = useState({
    employeeName: '',
    clientName: '',
    qualification: '',
    designation: '',
    experienceYears: 0,
    experienceMonths: 0,
    experienceShown: '',
    status: 'Draft',
    submissionDate: '',
    skills: [],
    summary: '',
    projects: []
  });

  const handleDraftChange = (field, value) => {
    setDraftResume(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleSkill = (skill) => {
    setDraftResume(prev => {
      const currentSkills = Array.isArray(prev.skills) ? prev.skills : [];
      if (currentSkills.includes(skill)) {
        return { ...prev, skills: currentSkills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...currentSkills, skill] };
      }
    });
  };

  const handleToggleProject = (project) => {
    setDraftResume(prev => {
      const currentProjects = Array.isArray(prev.projects) ? prev.projects : [];
      if (currentProjects.find(p => p.id === project.id)) {
        return { ...prev, projects: currentProjects.filter(p => p.id !== project.id) };
      } else {
        return { ...prev, projects: [...currentProjects, project] };
      }
    });
  };
  
  const [resumeSections, setResumeSections] = useState([
    { id: 1, name: 'Employee Information', subtitle: 'Name, designation, experience', visible: true },
    { id: 2, name: 'Skills', subtitle: '0 skills', visible: true },
    { id: 3, name: 'Professional Summary', subtitle: '0 points', visible: true },
    { id: 4, name: 'Projects', subtitle: '0 projects', visible: true },
    { id: 5, name: 'Experience', subtitle: '0 roles', visible: false },
    { id: 6, name: 'Education', subtitle: 'empty', visible: false },
  ]);

  const toggleSectionVisibility = (id) => {
    setResumeSections(resumeSections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };
  
  const [skillGroups, setSkillGroups] = useState([
    { id: 1, name: 'Web Frameworks', skills: ['ReactJS', 'Next.js', 'Express.js', 'Angular', 'Vue 3'] },
    { id: 2, name: 'Frontend Development', skills: ['HTML', 'CSS', 'JavaScript'] },
    { id: 3, name: 'Backend Development', skills: ['Node.js', 'Spring Boot', 'Django'] },
    { id: 4, name: 'API & Integration', skills: ['REST', 'GraphQL'] },
    { id: 5, name: 'Databases', skills: ['MySQL', 'MongoDB', 'PostgreSQL'] },
    { id: 6, name: 'Queueing System', skills: ['RabbitMQ'] },
    { id: 7, name: 'CI/CD & DevOps', skills: ['Docker', 'Kubernetes', 'Jenkins'] }
  ]);

  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: 'Bajaj Finance', 
      domain: 'Financial Services', 
      techStack: ['Core Java', 'Spring Boot', 'RESTful Web Services', 'Microservices'], 
      database: 'MySQL, MongoDB', 
      description: 'A comprehensive financial services platform supporting millions of users across India. The platform provides digital financial services including personal, home, gold, and professional loans, Easy EMI shopping, fixed deposits, insurance, utility bill payments, mobile/DTH recharges, and UPI-based money transfers. The application is designed with scalable backend services, secure API integrations, and reliable transaction processing to support diverse financial and payment requirements.', 
      responsibilities: [
        'Developed and maintained scalable backend applications using Java, Spring Boot, RESTful APIs, and Microservices architecture based on business requirements.',
        'Designed and implemented RESTful APIs for loan applications, EMI processing, fixed deposits, insurance, utility payments, recharges, and money transfer workflows.',
        'Developed business logic, validations, exception handling, authentication, and secure API communication for financial service applications.',
        'Worked with MySQL and MongoDB for database design, queries, data management, and integration with backend services.',
        'Integrated third-party services and payment platforms, and performed API debugging, performance optimization, testing, and issue resolution.',
        'Collaborated with frontend developers, QA engineers, product managers, and cross-functional teams using Git/GitLab and Jira within an Agile/Scrum environment.'
      ] 
    },
    { id: 2, title: 'Body Well — Appointment Booking System', domain: 'Healthcare', techStack: ['ReactJS', 'Next.js', 'TypeScript', 'Node.js'], database: '', description: '', responsibilities: [1,2,3,4,5] },
    { id: 3, title: 'ChargebackZero', domain: 'Payments', techStack: ['ReactJS', 'Node.js', 'Redux Toolkit', 'AWS'], database: '', description: '', responsibilities: [1,2,3] }
  ]);

  const [respGroups, setRespGroups] = useState([
    {
      id: 1,
      title: 'Backend Developer',
      items: [
        'Designed and developed RESTful APIs using Spring Boot / Node.js.',
        'Implemented authentication and authorization using JWT and OAuth2.',
        'Designed and optimized database schemas for MySQL and MongoDB.',
        'Integrated third-party payment gateways (Razorpay, Stripe).',
        'Deployed microservices using Docker and Kubernetes on AWS/GCP.',
        'Wrote unit and integration tests using JUnit and Mockito.'
      ]
    },
    {
      id: 2,
      title: 'Frontend Developer',
      items: [
        'Developed responsive UI components using ReactJS and Next.js.',
        'Integrated RESTful APIs and managed state using Redux/Context API.',
        'Collaborated with designers to implement pixel-perfect UI from Figma.',
        'Optimized page performance using lazy loading and code splitting.',
        'Wrote unit and integration tests using Jest and React Testing Library.',
        'Participated in code reviews and maintained coding standards.'
      ]
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      items: [
        'Built end-to-end web applications using ReactJS (frontend) and Node.js/Spring Boot (backend).',
        'Developed and consumed RESTful and GraphQL APIs.',
        'Managed CI/CD pipelines using GitHub Actions and Jenkins.',
        'Implemented role-based access control and secure authentication flows.',
        'Participated in Agile ceremonies including sprint planning and retrospectives.'
      ]
    }
  ]);

  const [newSkillText, setNewSkillText] = useState('');
  
  const handleAddSkill = (groupId) => {
    if (!newSkillText.trim()) return;
    setSkillGroups(groups => groups.map(g => {
      if (g.id === groupId) {
        return { ...g, skills: [...g.skills, newSkillText.trim()] };
      }
      return g;
    }));
    setNewSkillText('');
  };

  const handleRemoveSkill = (groupId, skillToRemove) => {
    setSkillGroups(groups => groups.map(g => {
      if (g.id === groupId) {
        return { ...g, skills: g.skills.filter(s => s !== skillToRemove) };
      }
      return g;
    }));
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleCreateProject = () => {
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    setProjects([{
      id: newId,
      title: 'New Project',
      domain: '',
      techStack: [],
      database: '',
      description: '',
      responsibilities: []
    }, ...projects]);
    setIsAddProjectModalOpen(false);
    setExpandedProjectId(newId);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.action-cell')) {
        setOpenActionMenuId(null);
      }
      if (!event.target.closest('.settings-popup') && !event.target.closest('.nav-settings')) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleActionMenu = (id, event) => {
    event.stopPropagation();
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container" onClick={() => { setIsViewingProjects(false); setIsViewingSkillSet(false); setIsViewingResponsibilities(false); setIsCreatingResume(false); setViewingResume(null); }} style={{cursor: 'pointer'}}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
          </svg>
        </div>
        
        <div className="nav-items">
          <a href="#" className={`nav-item ${!isCreatingResume && !viewingResume && !isViewingSkillSet && !isViewingProjects && !isViewingResponsibilities ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setIsViewingProjects(false); setIsViewingSkillSet(false); setIsViewingResponsibilities(false); setIsCreatingResume(false); setViewingResume(null); }}>
            <FileText size={20} />
            Resume
          </a>
        </div>
        
        <div className="spacer"></div>
        
        <div className="nav-items">
          <a href="#" className="nav-item">
            <HelpCircle size={20} />
            Help
          </a>
          <div style={{ position: 'relative' }}>
            <a 
              href="#" 
              className={`nav-item nav-settings ${isSettingsOpen ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setIsSettingsOpen(!isSettingsOpen); }}
            >
              <Settings size={20} />
              Settings
            </a>
            
            {isSettingsOpen && (
              <div className="settings-popup">
                <div className="settings-header">MASTERS</div>
                <div className="settings-menu-items">
                  <button className="settings-menu-item" onClick={() => { setIsSettingsOpen(false); setIsViewingSkillSet(true); setIsViewingProjects(false); setIsViewingResponsibilities(false); setIsCreatingResume(false); setViewingResume(null); }}>
                    <div className="settings-icon-wrapper">
                      <Star size={20} />
                    </div>
                    <span>Skill Set</span>
                  </button>
                  <button className="settings-menu-item" onClick={() => { setIsSettingsOpen(false); setIsViewingProjects(true); setIsViewingSkillSet(false); setIsViewingResponsibilities(false); setIsCreatingResume(false); setViewingResume(null); }}>
                    <div className="settings-icon-wrapper">
                      <FileText size={20} />
                    </div>
                    <span>Projects</span>
                  </button>
                  <button className="settings-menu-item" onClick={() => { setIsSettingsOpen(false); setIsViewingResponsibilities(true); setIsViewingProjects(false); setIsViewingSkillSet(false); setIsCreatingResume(false); setViewingResume(null); }}>
                    <div className="settings-icon-wrapper">
                      <Bookmark size={20} />
                    </div>
                    <span>Responsibilities</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-icons">
            <Bell size={20} />
            <Mail size={20} />
          </div>
          <div className="user-profile">
            <div className="avatar-circle">SH</div>
            <div className="user-info">
              <span className="user-name">Shenil HRMS</span>
              <span className="user-role">HR Manager</span>
            </div>
            <ChevronRight size={16} color="#64748b" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Page Content */}
        {isViewingResponsibilities ? (
          <div className="resp-groups-container">
            <div className="resume-header" style={{ padding: '2rem' }}>
              <div>
                <h2 className="resume-title">Common Responsibilities</h2>
                <p className="resume-subtitle">Reusable responsibility templates grouped by role. Apply them to projects in one click.</p>
              </div>
            </div>

            <div className="resp-groups-content">
              <div className="resp-toolbar">
                <button className="btn-primary" onClick={() => setIsAddRespGroupModalOpen(true)}>
                  <Plus size={16} /> Add group
                </button>
              </div>

              <div className="resp-cards-grid">
                {respGroups.map(group => (
                  <div key={group.id} className="resp-group-card">
                    <div className="resp-group-header">
                      <h3>{group.title}</h3>
                      <div className="resp-group-actions">
                        <button className="btn-icon"><Edit2 size={12} /></button>
                        <button className="btn-icon text-danger"><Trash2 size={12} /></button>
                      </div>
                    </div>
                    
                    <div className="resp-group-body">
                      {group.items.map((item, idx) => (
                        <div key={idx} className="resp-bullet-item">
                          <span className="bullet-dot">•</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="resp-group-footer">
                      <input type="text" placeholder="Add a responsibility..." />
                      <button className="btn-outline">Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAddRespGroupModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content" style={{ width: '480px' }}>
                  <div className="modal-header">
                    <h3>Create responsibility group</h3>
                    <button className="btn-close-modal" onClick={() => setIsAddRespGroupModalOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <p className="modal-subtitle">Name it after a role, e.g. Frontend Developer or Backend Developer.</p>
                  
                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label>Group title <span style={{color: '#ef4444'}}>*</span></label>
                    <input type="text" placeholder="e.g. Frontend Developer" />
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn-outline" onClick={() => setIsAddRespGroupModalOpen(false)}>Cancel</button>
                    <button className="btn-primary">Create group</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : isViewingProjects ? (
          <div className="projects-container">
            <div className="resume-header" style={{ padding: '2rem' }}>
              <div>
                <h2 className="resume-title">Projects</h2>
                <p className="resume-subtitle">Master project library. Projects are copied — never shared — when added to a resume.</p>
              </div>
            </div>

            <div className="projects-content">
              <div className="projects-toolbar">
                <div className="search-wrapper">
                  <Search size={16} className="search-icon" />
                  <input type="text" placeholder="Search projects..." className="search-input" />
                </div>
                <button className="btn-primary" onClick={() => setIsAddProjectModalOpen(true)}>
                  <Plus size={16} /> Add project
                </button>
              </div>

              <div className="projects-list">
                {projects.map(proj => (
                  <div key={proj.id} className={`project-card ${expandedProjectId === proj.id ? 'expanded' : ''}`}>
                    <div className="project-card-header" onClick={() => setExpandedProjectId(expandedProjectId === proj.id ? null : proj.id)}>
                      <div className="project-header-left">
                        <ChevronDown size={16} className={`chevron-icon ${expandedProjectId === proj.id ? 'open' : ''}`} />
                        <div>
                          <div className="project-title-display">{proj.title}</div>
                          <div className="project-subtitle-display">{proj.domain} · {proj.techStack.join(', ')}</div>
                        </div>
                      </div>
                      <div className="project-header-right">
                        <span className="responsibilities-badge">{proj.responsibilities.length} responsibilities</span>
                        <button className="btn-delete-project" onClick={(e) => { e.stopPropagation(); handleDeleteProject(proj.id); }}><Trash2 size={14} /></button>
                      </div>
                    </div>

                    {expandedProjectId === proj.id && (
                      <div className="project-card-body">
                        <div className="form-row">
                          <div className="form-group" style={{ flex: 2 }}>
                            <label>Title</label>
                            <input type="text" defaultValue={proj.title} />
                          </div>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Domain</label>
                            <input type="text" defaultValue={proj.domain} />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group" style={{ flex: 2 }}>
                            <label>Technology stack</label>
                            <div className="tech-stack-container">
                              {proj.techStack.map((tech, i) => (
                                <span key={i} className="tech-tag">{tech} <X size={12} style={{marginLeft: 4, cursor:'pointer'}}/></span>
                              ))}
                              <button className="btn-add-tech">+ Add</button>
                            </div>
                          </div>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Database</label>
                            <input type="text" defaultValue={proj.database} />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Description</label>
                          <textarea defaultValue={proj.description} rows="4"></textarea>
                        </div>

                        <div className="responsibilities-section">
                          <div className="resp-header">
                            <label>Responsibilities</label>
                            <div className="resp-filters">
                              <span className="resp-filter">+ Backend Developer</span>
                              <span className="resp-filter">+ Frontend Developer</span>
                              <span className="resp-filter">+ Full Stack Developer</span>
                              <span className="resp-filter">+ UI</span>
                            </div>
                          </div>
                          
                          <div className="resp-list">
                            {typeof proj.responsibilities[0] === 'string' ? proj.responsibilities.map((resp, idx) => (
                              <div key={idx} className="resp-item">
                                <span className="resp-bullet">•</span>
                                <span className="resp-text">{resp}</span>
                                <button className="btn-delete-resp"><Trash2 size={12} /></button>
                              </div>
                            )) : (
                              <div className="resp-item">
                                <span className="resp-text">Responsibilities would go here...</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="resp-add-input">
                            <input type="text" placeholder="Add a responsibility..." />
                            <button className="btn-outline">Add</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isAddProjectModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content" style={{ width: '560px' }}>
                  <div className="modal-header">
                    <h3>Create project</h3>
                    <button className="btn-close-modal" onClick={() => setIsAddProjectModalOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <label>Title <span style={{color: '#ef4444'}}>*</span></label>
                    <input type="text" placeholder="e.g. E-Commerce Platform" />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Domain</label>
                      <input type="text" placeholder="e.g. Retail" />
                    </div>
                    <div className="form-group flex-1">
                      <label>Database</label>
                      <input type="text" placeholder="e.g. PostgreSQL" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Technology stack</label>
                    <div className="select-wrapper">
                      <select defaultValue=""><option value="" disabled>Select technology</option></select>
                      <ChevronDown size={16} className="select-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="What the project does." rows="4"></textarea>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn-outline" onClick={() => setIsAddProjectModalOpen(false)}>Cancel</button>
                    <button className="btn-primary" onClick={handleCreateProject}>Create project</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : isViewingSkillSet ? (
          <div className="skill-set-container">
            <div className="resume-header" style={{ padding: '2rem' }}>
              <div>
                <h2 className="resume-title">Skill Set</h2>
                <p className="resume-subtitle">Manage technology groups and the skills inside them.</p>
              </div>
            </div>
            
            <div className="skill-set-content">
              <div className="skill-sidebar">
                <div className="skill-sidebar-header">
                  <h3>Groups</h3>
                  <button className="btn-add-group" onClick={() => setIsAddGroupModalOpen(true)}>
                    <Plus size={14} /> Add group
                  </button>
                </div>
                <div className="skill-group-list">
                  {skillGroups.map(group => (
                    <div 
                      key={group.id} 
                      className={`skill-group-item ${activeSkillGroup === group.id ? 'active' : ''}`}
                      onClick={() => setActiveSkillGroup(group.id)}
                    >
                      <span>{group.name}</span>
                      <span className="skill-count">{group.skills.length}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skill-main-area">
                {skillGroups.filter(g => g.id === activeSkillGroup).map(group => (
                  <div key={group.id}>
                    <div className="skill-main-header">
                      <div className="skill-main-title">
                        <h3>{group.name}</h3>
                        <button className="btn-edit-group"><Edit2 size={14} /></button>
                      </div>
                      <span className="skill-main-count">{group.skills.length} technologies</span>
                    </div>
                    
                    <div className="skill-input-container">
                      <input 
                        type="text" 
                        placeholder="e.g. ReactJS, Spring Boot..." 
                        className="skill-input" 
                        value={newSkillText}
                        onChange={(e) => setNewSkillText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(group.id)}
                      />
                      <button className="btn-add-skill" onClick={() => handleAddSkill(group.id)}><Plus size={16} /> Add</button>
                    </div>

                    <div className="skill-tags">
                      {group.skills.map((skill, idx) => (
                        <div key={idx} className="skill-tag">
                          {skill}
                          <button className="btn-remove-skill" onClick={() => handleRemoveSkill(group.id, skill)}><X size={12} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAddGroupModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Create skill group</h3>
                    <button className="btn-close-modal" onClick={() => setIsAddGroupModalOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <p className="modal-subtitle">Give the group a name (e.g. Frontend, Backend, DevOps).</p>
                  
                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label>Group name <span style={{color: '#ef4444'}}>*</span></label>
                    <input type="text" placeholder="e.g. Frontend Technologies" />
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn-outline" onClick={() => setIsAddGroupModalOpen(false)}>Cancel</button>
                    <button className="btn-primary">Create group</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : isCreatingResume ? (
          <div className="create-resume-container">
            <div className="resume-header">
              <div className="resume-header-left">
                <button className="back-btn" onClick={() => setIsCreatingResume(false)}>
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="resume-title">Create resume</h2>
                  <p className="resume-subtitle">Build a client-specific profile from an employee master record.</p>
                </div>
              </div>
              <div className="resume-header-actions">
                <button className="btn-outline" onClick={() => setIsCreatingResume(false)}>Cancel</button>
                <button className="btn-outline">Save as draft</button>
                {activeStep > 1 && (
                  <button className="btn-outline" onClick={() => setActiveStep(activeStep - 1)}>Previous</button>
                )}
                {activeStep < 4 && (
                  <button className="btn-primary" onClick={() => setActiveStep(activeStep + 1)}>Next</button>
                )}
                {activeStep === 4 && (
                  <button className="btn-primary" onClick={() => setIsCreatingResume(false)}><Check size={16} /> Save resume</button>
                )}
              </div>
            </div>

            <div className="resume-metadata">
              <div className="metadata-items">
                <div className="meta-avatar-empty">-</div>
                <div className="metadata-item">
                  <span className="meta-value" style={{fontSize:'1rem'}}>{draftResume.employeeName || 'No employee selected'}</span>
                  <span className="meta-subtitle">{draftResume.clientName ? `— ${draftResume.clientName}` : '— No client'}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">DESIGNATION</span>
                  <span className="meta-value">{draftResume.designation || '—'}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">EXPERIENCE</span>
                  <span className="meta-value">{draftResume.experienceShown || '—'}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">TEMPLATE</span>
                  <span className="meta-value">Corporate Resume v3</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">PROJECTS</span>
                  <span className="meta-value">0 projects</span>
                </div>
              </div>
              <span className={`status-badge ${draftResume.status === 'Draft' ? 'status-draft' : 'status-active'}`}>{draftResume.status}</span>
            </div>

            <div className="stepper-container">
              <div className={`step ${activeStep >= 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)} style={{cursor: 'pointer'}}>
                <span className="step-label">Basic information</span>
                <span className="step-number">{activeStep > 1 ? <Check size={12} /> : '1'}</span>
              </div>
              <div className="step-divider"></div>
              <div className={`step ${activeStep >= 2 ? 'active' : ''}`} onClick={() => { if(activeStep >= 1) setActiveStep(2) }} style={{cursor: activeStep >= 1 ? 'pointer' : 'not-allowed'}}>
                <span className="step-label">Skills & Summary</span>
                <span className="step-number">{activeStep > 2 ? <Check size={12} /> : '2'}</span>
              </div>
              <div className="step-divider"></div>
              <div className={`step ${activeStep >= 3 ? 'active' : ''}`} onClick={() => { if(activeStep >= 2) setActiveStep(3) }} style={{cursor: activeStep >= 2 ? 'pointer' : 'not-allowed'}}>
                <span className="step-label">Project Details</span>
                <span className="step-number">{activeStep > 3 ? <Check size={12} /> : '3'}</span>
              </div>
              <div className="step-divider"></div>
              <div className={`step ${activeStep >= 4 ? 'active' : ''}`} onClick={() => { if(activeStep >= 3) setActiveStep(4) }} style={{cursor: activeStep >= 3 ? 'pointer' : 'not-allowed'}}>
                <span className="step-label">Preview</span>
                <span className="step-number">4</span>
              </div>
            </div>

            <div className="create-content-split">
              {activeStep !== 4 && (
                <div className="form-panel">
                  {activeStep === 1 && (
                    <div className="form-card">
                      <h3 className="form-title">Basic information</h3>
                      <p className="form-subtitle">Designation and experience are recorded against this client only.</p>
                      
                      <div className="form-group">
                        <label>Employee <span>*</span></label>
                        <div className="select-wrapper">
                          <select value={draftResume.employeeName} onChange={(e) => handleDraftChange('employeeName', e.target.options[e.target.selectedIndex].text)}>
                            <option value="" disabled>Select employee</option>
                            <option value="Shanmugam Sundaram P">Shanmugam Sundaram P</option>
                            <option value="Madhavan S.">Madhavan S.</option>
                            <option value="Arun Kumar">Arun Kumar</option>
                            <option value="David Fernandes">David Fernandes</option>
                            <option value="Rahul Sharma">Rahul Sharma</option>
                          </select>
                          <ChevronDown size={16} className="select-icon" />
                        </div>
                        <span className="helper-text">Pick the employee to build this resume from</span>
                      </div>

                      <div className="form-row">
                        <div className="form-group flex-1">
                          <label>Client <span>*</span></label>
                          <div className="input-with-button">
                            <div className="select-wrapper flex-1">
                              <select value={draftResume.clientName} onChange={(e) => handleDraftChange('clientName', e.target.value)}>
                                <option value="" disabled>Select client</option>
                                <option value="ABC Technologies">ABC Technologies</option>
                                <option value="Qantler Digital">Qantler Digital</option>
                                <option value="Finobl Systems">Finobl Systems</option>
                                <option value="Northwind Logistics">Northwind Logistics</option>
                              </select>
                              <ChevronDown size={16} className="select-icon" />
                            </div>
                            <button className="btn-add-client"><Plus size={16} /></button>
                          </div>
                        </div>
                        <div className="form-group flex-1">
                          <label>Qualification</label>
                          <div className="select-wrapper">
                            <select value={draftResume.qualification} onChange={(e) => handleDraftChange('qualification', e.target.value)}>
                              <option value="" disabled>Select qualification</option>
                              <option value="B.E. Electronics">B.E. Electronics</option>
                              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                              <option value="MCA">MCA</option>
                              <option value="B.Sc IT">B.Sc IT</option>
                            </select>
                            <ChevronDown size={16} className="select-icon" />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Designation for client <span>*</span></label>
                        <input type="text" placeholder="e.g. Senior React Developer" value={draftResume.designation} onChange={(e) => handleDraftChange('designation', e.target.value)} />
                        <span className="helper-text">Free text — this is what the client sees</span>
                      </div>

                      <div className="form-group">
                        <label>Relevant experience <span>*</span></label>
                        <div className="experience-inputs">
                          <input type="number" value={draftResume.experienceYears} onChange={(e) => handleDraftChange('experienceYears', e.target.value)} className="number-input" />
                          <span className="unit-label">Years</span>
                          <input type="number" value={draftResume.experienceMonths} onChange={(e) => handleDraftChange('experienceMonths', e.target.value)} className="number-input" />
                          <span className="unit-label">Months</span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Experience shown on the resume</label>
                        <input type="text" placeholder="e.g. 8+ Years" value={draftResume.experienceShown} onChange={(e) => handleDraftChange('experienceShown', e.target.value)} />
                        <span className="helper-text">Leave empty to print "—"</span>
                      </div>

                      <div className="form-row">
                        <div className="form-group flex-1">
                          <label>Status</label>
                          <div className="select-wrapper">
                            <select value={draftResume.status} onChange={(e) => handleDraftChange('status', e.target.value)}>
                              <option value="Draft">Draft</option>
                              <option value="Submitted">Submitted</option>
                            </select>
                            <ChevronDown size={16} className="select-icon" />
                          </div>
                        </div>
                        <div className="form-group flex-1">
                          <label>Submission date</label>
                          <div className="date-wrapper">
                            <input type="date" className="date-input-native" value={draftResume.submissionDate} onChange={(e) => handleDraftChange('submissionDate', e.target.value)} />
                          </div>
                          <span className="helper-text">Leave empty until the resume goes to the client</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="form-card">
                      <h3 className="form-title">Skills & Summary</h3>
                      <p className="form-subtitle">Select technical skills from the master list and add a professional summary.</p>
                      
                      <div className="form-group">
                        <label>Select Skills from Master Data</label>
                        <div className="master-skills-selector" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                          {skillGroups.map(group => (
                            <div key={group.id} style={{ marginBottom: '1rem' }}>
                              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-color)', fontSize: '0.875rem' }}>{group.name}</strong>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {group.skills.map(skill => (
                                  <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                                    <input 
                                      type="checkbox" 
                                      checked={Array.isArray(draftResume.skills) && draftResume.skills.includes(skill)} 
                                      onChange={() => handleToggleSkill(skill)} 
                                    />
                                    {skill}
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Professional Summary</label>
                        <textarea placeholder="Write a brief summary..." rows="6" value={draftResume.summary} onChange={(e) => handleDraftChange('summary', e.target.value)}></textarea>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="form-card">
                      <h3 className="form-title">Project Details</h3>
                      <p className="form-subtitle">Select projects from the master library to include in this resume.</p>
                      
                      <div className="master-projects-selector" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {projects.map(proj => (
                          <label key={proj.id} className="project-card" style={{ display: 'flex', alignItems: 'flex-start', padding: '1rem', cursor: 'pointer', margin: 0, gap: '1rem' }}>
                            <input 
                              type="checkbox" 
                              style={{ marginTop: '0.25rem' }}
                              checked={Array.isArray(draftResume.projects) && draftResume.projects.some(p => p.id === proj.id)} 
                              onChange={() => handleToggleProject(proj)} 
                            />
                            <div>
                              <div className="project-title-display">{proj.title}</div>
                              <div className="project-subtitle-display">{proj.domain} · {proj.techStack.join(', ')}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="info-box">
                      <Info size={20} className="info-icon" />
                      <p>The employee master record is never modified. This resume holds its own copy of every field, so the same employee can be presented differently to each client.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="preview-panel" style={{ width: activeStep === 4 ? '100%' : '50%' }}>
                <div className="preview-header">
                  <div className="preview-title">
                    <span className="live-dot"></span>
                    <strong>Live preview</strong>
                    <span className="template-name">Corporate Resume v3</span>
                  </div>
                  <div className="preview-actions">
                    <button className="zoom-btn" onClick={() => setZoomLevel(Math.max(40, zoomLevel - 15))}>-</button>
                    <button className="zoom-btn active" onClick={() => setZoomLevel(100)}>{zoomLevel}%</button>
                    <button className="zoom-btn" onClick={() => setZoomLevel(Math.min(160, zoomLevel + 15))}>+</button>
                    <button className="sections-btn" onClick={() => setIsSectionsModalOpen(true)}>
                      <Settings2 size={14} /> 
                      Sections {resumeSections.filter(s => s.visible).length}/{resumeSections.length}
                    </button>
                  </div>
                </div>
                
                <div className="preview-document-container">
                  <div className="preview-document" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
                    <table className="resume-table">
                      <tbody>
                        <tr>
                          <th colSpan="2" className="table-heading">Professional Experience Details:</th>
                        </tr>
                        <tr>
                          <td className="col-label">Name:</td>
                          <td className="col-value">{draftResume.employeeName || '—'}</td>
                        </tr>
                        <tr>
                          <td className="col-label">Qualification</td>
                          <td className="col-value">{draftResume.qualification || '—'}</td>
                        </tr>
                        <tr>
                          <td className="col-label">Designation:</td>
                          <td className="col-value">{draftResume.designation || '—'}</td>
                        </tr>
                        <tr>
                          <td className="col-label">Experience:</td>
                          <td className="col-value">{draftResume.experienceShown || `${draftResume.experienceYears > 0 ? draftResume.experienceYears + ' Years' : '—'}`}</td>
                        </tr>
                        {Array.isArray(draftResume.skills) && draftResume.skills.length > 0 && (
                          <tr>
                            <td className="col-label" style={{verticalAlign:'top'}}>Skills:</td>
                            <td className="col-value">{draftResume.skills.join(', ')}</td>
                          </tr>
                        )}
                        {draftResume.summary && (
                          <tr>
                            <td className="col-label" style={{verticalAlign:'top'}}>Summary:</td>
                            <td className="col-value">{draftResume.summary}</td>
                          </tr>
                        )}
                        {Array.isArray(draftResume.projects) && draftResume.projects.length > 0 && (
                          <tr>
                            <td className="col-label" style={{verticalAlign:'top'}}>Projects:</td>
                            <td className="col-value">
                              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                {draftResume.projects.map(p => (
                                  <li key={p.id} style={{ marginBottom: '0.5rem' }}>
                                    <strong>{p.title}</strong> ({p.domain})<br/>
                                    <em>Tech: {p.techStack.join(', ')}</em>
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {isSectionsModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content sections-modal">
                  <div className="modal-header">
                    <h3>Arrange sections</h3>
                    <button className="btn-close-modal" onClick={() => setIsSectionsModalOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <p className="modal-subtitle">Order and visibility apply to the preview and the download.</p>
                  
                  <div className="sections-list-container">
                    <div className="sections-list-header">
                      <strong>Arrange sections</strong>
                      <p>Drag to reorder. Hidden sections are excluded from the preview and the download.</p>
                    </div>
                    
                    <div className="sections-list">
                      {resumeSections.map((section, index) => (
                        <div key={section.id} className="section-list-item">
                          <div className="section-item-left">
                            <GripVertical size={16} className="drag-handle" />
                            <span className="section-number">{index + 1}</span>
                            <div className="section-item-text">
                              <span className="section-item-title">{section.name}</span>
                              <span className="section-item-subtitle">{section.subtitle}</span>
                            </div>
                          </div>
                          <div className="section-item-right">
                            {section.visible ? <Eye size={16} className="section-icon" /> : <EyeOff size={16} className="section-icon-hidden" />}
                            <div className={`toggle-switch ${section.visible ? 'active' : ''}`} onClick={() => toggleSectionVisibility(section.id)}>
                              <div className="toggle-thumb"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : viewingResume ? (
          <div className="resume-view-container">
            <div className="resume-header">
              <div className="resume-header-left">
                <button className="back-btn" onClick={() => setViewingResume(null)}>
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="resume-title">{viewingResume.name}</h2>
                  <p className="resume-subtitle">{viewingResume.role} · {viewingResume.client}</p>
                </div>
              </div>
              <div className="resume-header-actions">
                <button className="btn-outline"><Printer size={16} /> Print</button>
                <button className="btn-outline"><Pencil size={16} /> Edit</button>
                <button className="btn-primary"><Download size={16} /> Download DOCX</button>
                <button className="btn-outline text-danger" style={{ borderColor: '#fca5a5' }}><Trash2 size={16} /> Delete</button>
              </div>
            </div>

            <div className="resume-metadata">
              <div className="metadata-items">
                <div className="metadata-item">
                  <span className="meta-label">EMPLOYEE ID</span>
                  <span className="meta-value">{viewingResume.id}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">QUALIFICATION</span>
                  <span className="meta-value">B.E. Electronics</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">EXPERIENCE</span>
                  <span className="meta-value">{viewingResume.exp}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">DATE SUBMITTED</span>
                  <span className="meta-value">{viewingResume.date}</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">TEMPLATE</span>
                  <span className="meta-value">Corporate Resume v2</span>
                </div>
                <div className="metadata-item">
                  <span className="meta-label">LAST UPDATED</span>
                  <span className="meta-value">26 Aug 2026, 17:48</span>
                </div>
              </div>
              <span className={`status-badge ${viewingResume.status === 'Submitted' ? 'status-submitted' : 'status-draft'}`}>
                {viewingResume.status}
              </span>
            </div>

            <div className="warning-banner">
              <AlertCircle size={16} color="#d97706" />
              <span>
                This resume was generated with <strong>Corporate Resume v2</strong>. The active template is now <strong>Corporate Resume v3</strong>. It renders and downloads on its original version so the submitted document stays reproducible — open Edit and save to move it forward.
              </span>
            </div>

            <div className="document-container">
              <div className="document-paper">
                <table className="resume-table">
                  <tbody>
                    <tr>
                      <th colSpan="2" className="table-heading">Professional Experience Details:</th>
                    </tr>
                    <tr>
                      <td className="col-label">Name:</td>
                      <td className="col-value"><strong>{viewingResume.name}</strong></td>
                    </tr>
                    <tr>
                      <td className="col-label">Qualification</td>
                      <td className="col-value">B.E. Electronics</td>
                    </tr>
                    <tr>
                      <td className="col-label">Designation:</td>
                      <td className="col-value">{viewingResume.role}</td>
                    </tr>
                    <tr>
                      <td className="col-label">Experience:</td>
                      <td className="col-value">{viewingResume.exp}</td>
                    </tr>
                    <tr>
                      <td className="col-label">Skill Set:</td>
                      <td className="col-value">
                        <strong>Web Frameworks:</strong> ReactJS, Angular<br/>
                        <strong>Backend Development:</strong> Node.js, .NET Core, REST APIs<br/>
                        <strong>Cloud Platforms:</strong> AWS (EC2, S3, Lambda)<br/>
                        <strong>Tools & Practices:</strong> Agile / Scrum, Jira, Git
                      </td>
                    </tr>
                    <tr>
                      <td className="col-label">Professional Summary</td>
                      <td className="col-value">
                        <ul className="resume-list">
                          <li>Led cross-functional teams of 8-12 engineers through discovery, delivery and support.</li>
                          <li>Set technical direction, review standards and definition of done for the squad.</li>
                          <li>Ran architecture reviews and translated technical trade-offs for non-technical stakeholders.</li>
                          <li>Mentored six engineers to the next competency level over two review cycles.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-label">Project #1</td>
                      <td className="col-value">
                        <strong>Title: Viafone — ERP System</strong><br/>
                        <strong>Role:</strong> Technical Lead<br/>
                        <strong>Technology:</strong> Angular, .NET Core, Redis, Azure<br/>
                        <strong>Database:</strong> MSSQL Server 2012+<br/>
                        <strong>Description:</strong><br/>
                        An in-house ERP covering procurement, inventory, dispatch and invoicing for a logistics operator running 400+ vehicles.<br/>
                        <strong>Responsibilities:</strong>
                        <ul className="resume-list">
                          <li>Owned the inventory and dispatch modules end to end.</li>
                          <li>Modelled the stock ledger to keep running balances auditable across warehouses.</li>
                          <li>Built a reporting layer with cached aggregates for sub-second dashboard loads.</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bottom-bar">
              <span className="bottom-text">Read-only view. Use Edit to change content — the document design comes from the template.</span>
              <button className="btn-outline" onClick={() => setViewingResume(null)}>Back to resumes</button>
            </div>
          </div>
        ) : (
          <div className="page-container">
            <div className="page-header">
            <h1 className="page-title">Resumes</h1>
            <p className="page-subtitle">Client-specific resume profiles built from employee master records.</p>
          </div>

          <div className="toolbar">
            <div className="search-container">
              <Search size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search employee, client or designation" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="actions">
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn-filter"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} />
                  Filters
                </button>
                
                {isFilterOpen && (
                  <div className="filter-popup">
                    <div className="filter-header">
                      <h3>Filter options</h3>
                      <button className="close-btn" onClick={() => setIsFilterOpen(false)}>
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="filter-body">
                      <div className="filter-sidebar">
                        {['Client', 'Designation', 'Experience (Years)', 'Status'].map(tab => (
                          <button 
                            key={tab}
                            className={`filter-tab ${activeFilterTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveFilterTab(tab)}
                            style={{display: 'flex', alignItems: 'center'}}
                          >
                            {tab}
                            {selectedFilters[tab]?.length > 0 && <span className="filter-count-badge" style={{background:'#e2e8f0', color:'#475569', padding:'2px 6px', borderRadius:'10px', fontSize:'0.7rem', marginLeft:'auto'}}>{selectedFilters[tab].length}</span>}
                          </button>
                        ))}
                      </div>
                      
                      <div className="filter-content">
                        {filterOptions[activeFilterTab] && (
                          <>
                            <div className="filter-search">
                              <Search size={16} />
                              <input type="text" placeholder={`Search ${activeFilterTab.toLowerCase()}`} />
                            </div>
                            <div className="filter-list">
                              {filterOptions[activeFilterTab].map(option => (
                                <label key={option} className="checkbox-item">
                                  <input 
                                    type="checkbox" 
                                    checked={selectedFilters[activeFilterTab].includes(option)}
                                    onChange={() => toggleFilter(activeFilterTab, option)}
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="filter-footer">
                      <button className="btn-clear" disabled={!hasActiveFilters} onClick={clearAllFilters} style={{opacity: hasActiveFilters ? 1 : 0.5}}>Clear all</button>
                      <div className="footer-actions">
                        <button className="btn-cancel" onClick={() => setIsFilterOpen(false)}>Cancel</button>
                        <button className="btn-apply" onClick={() => setIsFilterOpen(false)}>Apply</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="btn-primary" onClick={() => setIsCreatingResume(true)}>
                <Plus size={16} />
                Create Resume
              </button>
            </div>
          </div>

          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Designation</th>
                  <th>Experience</th>
                  <th>Client</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResumes.map((row, index) => (
                  <tr key={index}>
                    <td style={{ color: '#64748b' }}>{index + 1}</td>
                    <td>
                      <div className="employee-cell">
                        <div className={`employee-avatar ${row.avatarBg}`}>
                          {row.initials}
                        </div>
                        <div className="employee-details">
                          <span className="employee-name">{row.name}</span>
                          <span className="employee-id">{row.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#475569' }}>{row.role}</td>
                    <td style={{ color: '#475569' }}>{row.exp}</td>
                    <td style={{ color: '#475569' }}>{row.client}</td>
                    <td style={{ color: '#475569', fontWeight: row.date !== 'Not Submitted' ? '500' : 'normal' }}>{row.date}</td>
                    <td>
                      <span className={`status-badge ${row.status === 'Submitted' ? 'status-submitted' : 'status-draft'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button 
                        className="action-btn"
                        onClick={(e) => toggleActionMenu(row.id, e)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openActionMenuId === row.id && (
                        <div className="action-menu">
                          <button 
                            className="action-menu-item"
                            onClick={() => {
                              setViewingResume(row);
                              setOpenActionMenuId(null);
                            }}
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                          <button 
                            className="action-menu-item"
                            onClick={() => {
                              setIsCreatingResume(true);
                              setOpenActionMenuId(null);
                            }}
                          >
                            <Pencil size={16} />
                            <span>Edit</span>
                          </button>
                          <button 
                            className="action-menu-item"
                            onClick={() => {
                              const newResume = { ...row, id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Draft', date: 'Not Submitted' };
                              setResumes([newResume, ...resumes]);
                              setOpenActionMenuId(null);
                            }}
                          >
                            <Copy size={16} />
                            <span>Duplicate</span>
                          </button>
                          <button 
                            className="action-menu-item text-danger"
                            onClick={() => {
                              setItemToDelete(row.id);
                              setOpenActionMenuId(null);
                            }}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredResumes.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No resumes found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="pagination">
              <div className="rows-per-page">
                <span>Rows per page</span>
                <select className="rows-select" defaultValue="10">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              
              <div className="page-controls">
                <span>1 - 8 of 8</span>
                <div className="page-buttons">
                  <button className="page-btn" disabled>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn" disabled>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        
        {itemToDelete && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Delete Resume</h3>
                <button className="btn-close-modal" onClick={() => setItemToDelete(null)}>
                  <X size={16} />
                </button>
              </div>
              <p className="modal-subtitle">Are you sure you want to delete this resume? This action cannot be undone.</p>
              
              <div className="modal-actions">
                <button className="btn-outline" onClick={() => setItemToDelete(null)}>Cancel</button>
                <button className="btn-primary" style={{backgroundColor: '#ef4444', borderColor: '#ef4444'}} onClick={() => {
                  setResumes(resumes.filter(r => r.id !== itemToDelete));
                  setItemToDelete(null);
                }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
