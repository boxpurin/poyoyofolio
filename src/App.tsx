import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Modal,
  Link,
  Paper,
  Stack,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ImageList,
  ImageListItem,
} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { styled, useTheme } from "@mui/material/styles";
import AboutMd from "./assets/about.md?raw";
import TssMd from "./assets/tss.md?raw";
import Item2Md from "./assets/item2.md?raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

interface SkillRow {
  skill: string;
  desc?: string;
}

// プログラミング言語
const langSkills: SkillRow[] = [
  { skill: "Visual C++" },
  { skill: "C#", desc: "1年" },
  { skill: "Rust" },
  { skill: "TypeScript" },
  { skill: "Python3", desc: "6カ月" },
];

// フレームワーク・ライブラリ
const FrameworkOrLibrarySkills: SkillRow[] = [
  { skill: "Axum(Rust)" },
  { skill: ".NET Framework(C#)", desc: "1年" },
  { skill: "WPF(C#)", desc: "1年" },
  { skill: "PySide2", desc: "6ヶ月" },
  { skill: "React", desc: "" },
];

// データストア/ミドルウェア
const DatastoreSkills: SkillRow[] = [
  { skill: "SQLite", desc: "6ヶ月" },
  { skill: "Meilisearch" },
];

// クラウド/開発・運用ツール
const toolSkills: SkillRow[] = [
  { skill: "Google Cloud", desc: "" },
  { skill: "Git / GitHub" },
  { skill: "Docker / Docker Compose" },
  { skill: "Vim" },
  { skill: "VSCode", desc: "6ヶ月" },
  { skill: "Visual Studio", desc: "1年" },
];


type CustomMarkdownProps = {
  children: string;
  className?: string;
};

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
  children,
  className,
}) => {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => {
          const isExternal =
            !!href && (href.startsWith("http://") || href.startsWith("https://"));

          return (
            <a
              href={href}
              {...props}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

interface RepositoryInfoPaper {
  title: string;
  comment: string;
  images?: string[];
  children: React.ReactNode;
}

const RepositoryInfoPaper = (props: RepositoryInfoPaper) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      {/* 一番外側のモーダル */}
      <Modal open={isModalOpen} onClose={handleClose} sx={{ overflow: "auto" }}>
        <Paper sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxHeight: "90%",
          bgcolor: "#fff",
          border: "4px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {props.children}
            <ImageList cols={4}>
              {props.images?.map((img, idx) => (
                <ImageListItem key={idx}>
                  <img
                    key={idx}
                    src={img}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPreviewImage(img);   // クリックした画像を保存
                      setPreviewOpen(true);   // プレビューモーダルを開く
                    }}
                  />
                </ImageListItem>
              )) || []}
            </ImageList>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Paper>
      </Modal>

      {/* 画像プレビュー用のモーダル（2段目） */}
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            p: 2,
            outline: "none",
          }}
        >
          {previewImage && (
            <Box
              component="img"
              src={previewImage}
              sx={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
              }}
            />
          )}
        </Paper>
      </Modal>

      {/* サムネイル側のカード */}
      <Paper
        sx={{
          paddingBottom: 2,
          width: 350,
          borderRadius: "10px",
        }}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "10px 10px 0 0",
          }}
        >
          {props.title}
        </Typography>
        <Typography variant="body1">{props.comment}</Typography>
      </Paper>
    </Box >
  );
};

const TableHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiTableCell-root": {
    color: theme.palette.common.black,
    fontSize: "1rem",
  },
}));

const TableHeaderCell = styled(TableCell)((_theme) => ({}));

interface SkillSheetTableProps {
  label: string;
  rows: SkillRow[];
}

const SkillSheetTable = (props: SkillSheetTableProps) => {
  const Row = React.useMemo(() => {
    return props.rows.map((x) => {
      return (
        <TableRow>
          <TableCell>{x.skill}</TableCell>
          <TableCell>{x.desc}</TableCell>
        </TableRow>
      );
    });
  }, [props.rows]);

  return (
    <Box sx={{ justifyContent: "center" }}>
      <TableContainer component={Paper} variant="outlined" sx={{ width: 350 }}>
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeaderCell>{props.label}</TableHeaderCell>
              <TableHeaderCell>実務期間</TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>{Row}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const FooterBox = styled(Box)(({ theme }) => ({
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

export default function App() {
  const theme = useTheme();

  return (
    <>
      <Container
        sx={{ bgcolor: theme.palette.primary.main, Width: "100%" }}
      >
        <header>
          <Box sx={{ py: 4 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Portfolio
            </Typography>
          </Box>
        </header>
      </Container>
      <main className="App">
        <Stack useFlexGap spacing={2} sx={{ alignItems: "center", my: 4, maxWidth: 800 }}>
          <Typography variant="h4">About</Typography>
          <Paper sx={{ width: "50%", minWidth: 350, textAlign: "left", p: 2 }}>
            <CustomMarkdown>{AboutMd}</CustomMarkdown>
          </Paper>
          <Box>
            <Typography variant="h4">Skill</Typography>
          </Box>
          <Stack
            direction="row"
            useFlexGap
            spacing={{ xs: 1, sm: 2 }}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <SkillSheetTable label="プログラミング言語" rows={langSkills} />
            <SkillSheetTable label="フレームワーク/ライブラリ" rows={FrameworkOrLibrarySkills} />
            <SkillSheetTable label="データストア/ミドルウェア" rows={DatastoreSkills} />
            <SkillSheetTable label="クラウド/開発/運用" rows={toolSkills} />
          </Stack>

          <Typography variant="h4">Repository</Typography>
          <Stack
            direction="row"
            useFlexGap
            spacing={{ xs: 1, sm: 2 }}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <RepositoryInfoPaper
              title={"配信タイムスタンプ検索"}
              comment={"YouTubeチャンネルのタイムスタンプ検索用サイト"}
              images={["tss/00.webp", "tss/01.webp", "tss/02.webp", "tss/03.webp"]}
            >
              <Box sx={{ width: "100%" }}>
                <CustomMarkdown>
                  {TssMd}
                </CustomMarkdown>
              </Box>
            </RepositoryInfoPaper>
            <RepositoryInfoPaper
              title={"Portfolio Page"}
              comment={"このポートフォリオサイトのリポジトリです。"}
            >
              <Box sx={{ width: "100%" }}>
                <CustomMarkdown>{Item2Md}</CustomMarkdown>
              </Box>
            </RepositoryInfoPaper>
          </Stack>
        </Stack>
      </main>

      <Container
        sx={{ bgcolor: theme.palette.primary.main, Width: "100%" }}
      >
        <footer>
          <FooterBox py={6} textAlign="center">
            <Box>
              <Link
                sx={{ color: theme.palette.secondary.main }}
                px={3}
                target="_blank"
                aria-label="github"
                rel="noopener"
                href="https://github.com/boxpurin"
              >
                GitHub
              </Link>
              <Link
                sx={{ color: theme.palette.secondary.main }}
                px={3}
                target="_blank"
                aria-label="twitter"
                rel="noopener"
                href="https://x.com/boxpurin"
              >
                Twitter(X)
              </Link>
            </Box>
            <Typography>© 2025 All rights reserved.</Typography>
          </FooterBox>
        </footer>
      </Container>
    </>
  );
}
